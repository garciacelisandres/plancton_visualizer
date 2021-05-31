import axios from "axios";
import { Sample } from "../model/Sample";
import { Class } from "../model/Class";
import { ACTION_REQUEST_PROGRESS_UPDATE } from "../contexts/reducers/requestProgress/RequestProgressActions";

class ServerCall {
  async getSamples(
    start_time: Date | undefined = undefined,
    end_time: Date | undefined = undefined,
    sample_classes: Class[] | undefined = undefined,
    quant_method: undefined = undefined,
    progressDispatch: Function | undefined = undefined
  ): Promise<Sample[]> {
    var url = `${process.env.REACT_APP_API_URL}/samples`;
    var params: string[] = [];
    if (start_time)
      params.push(`start_time=${Math.floor(start_time.getTime() / 1000)}`);
    if (end_time)
      params.push(`end_time=${Math.ceil(end_time.getTime() / 1000)}`);
    if (sample_classes && sample_classes.length > 0) {
      let sample_classes_param = "";
      sample_classes.forEach((sample_class, index) => {
        if (index === 0) {
          sample_classes_param += `sample_classes=${sample_class.id},`;
        } else if (index !== sample_classes.length - 1) {
          sample_classes_param += `${sample_class.id},`;
        } else {
          sample_classes_param += `${sample_class.id}`;
        }
      });
      params.push(sample_classes_param);
    }
    if (quant_method) params.push(`quant_method=${quant_method}`);
    params.forEach((param, index) => {
      if (index === 0) url += `?${param}&`;
      else if (index === params.length - 1) url += `${param}`;
      else url += `${param}&`;
    });
    if (progressDispatch)
      progressDispatch({
        type: ACTION_REQUEST_PROGRESS_UPDATE,
        params: { value: 0 },
      });
    let retrieved = await axios({
      method: "GET",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      onDownloadProgress: (progressEvent: ProgressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (progressDispatch) {
          console.log(percentCompleted);
          progressDispatch({
            type: ACTION_REQUEST_PROGRESS_UPDATE,
            params: { value: percentCompleted },
          });
        }
      },
    })
      .then((data) => {
        let samples_list: Sample[] = [];
        let samples_response = data.data.samples;
        samples_response.forEach((sample: any) => {
          let sample_id: string = sample["_id"];
          let sample_name: string = sample["name"];
          let sample_date: Date = new Date(
            Math.floor(sample["date_retrieved"]) * 1000
          );
          let sample_values: any[] = sample["sample_classes"];
          sample_values = sample_values.map((value) => {
            return {
              class_id: value.class_id,
              values: value.values.map(
                (each: { method: string; value: number }) => {
                  return {
                    method: each.method,
                    value: each.value,
                  };
                }
              ),
            };
          });
          samples_list.push(
            new Sample(sample_id, sample_name, sample_date, sample_values)
          );
        });
        return samples_list;
      })
      .catch((err) => {
        let empty_list: Sample[] = [];
        return empty_list;
      });
    return retrieved;
  }

  async getClasses(): Promise<Class[]> {
    var url = `${process.env.REACT_APP_API_URL}/samples/classes`;
    let retrieved = await axios({
      method: "GET",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        let classes_list: Class[] = [];
        let classes_response: any[] = data.data.classes;
        classes_response.forEach((class_obj) => {
          let class_id: string = class_obj["_id"];
          let class_name: string = class_obj["name"];
          classes_list.push(new Class(class_id, class_name));
        });
        return classes_list;
      })
      .catch((err) => {
        let empty_list: Class[] = [];
        return empty_list;
      });
    return retrieved;
  }
}

var server = new ServerCall();

export default server;
