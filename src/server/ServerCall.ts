import axios from "axios";
import { Sample } from "../model/Sample";
import { Class } from "../model/Class";

class ServerCall {
  async getSamples(
    start_time: Date | undefined = undefined,
    end_time: Date | undefined = undefined,
    sample_classes: Class[] | undefined = undefined,
    quant_method: undefined = undefined
  ): Promise<Sample[]> {
    var url = "http://localhost:5000/api/v0.1/samples";
    var params: string[] = [];
    if (start_time) params.push(`start_time=${start_time.getTime() / 1000}`);
    if (end_time) params.push(`end_time=${end_time.getTime() / 1000}`);
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
    params.forEach((param, index) => {
      if (index === 0) url += `?${param}&`;
      else if (index === params.length - 1) url += `${param}`;
      else url += `${param}&`;
    });
    let retrieved = await axios({
      method: "GET",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((data) => {
      let samples_list: Sample[] = [];
      let samples_response = data.data.samples;
      samples_response.forEach((sample: any) => {
        let sample_id: string = sample["_id"];
        let sample_name: string = sample["name"];
        let sample_date: Date = new Date(sample["date_retrieved"] * 1000);
        let sample_values: any[] = sample["sample_classes"];
        samples_list.push(
          new Sample(sample_id, sample_name, sample_date, sample_values)
        );
      });
      return samples_list;
    });
    return retrieved;
  }

  async getClasses(): Promise<Class[]> {
    var url = "http://localhost:5000/api/v0.1/samples/classes";
    let retrieved = await axios({
      method: "GET",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((data) => {
      let classes_list: Class[] = [];
      let classes_response: any[] = data.data.classes;
      classes_response.forEach((class_obj) => {
        let class_id: string = class_obj["_id"];
        let class_name: string = class_obj["name"];
        classes_list.push(new Class(class_id, class_name));
      });
      return classes_list;
    });
    return retrieved;
  }
}

var server = new ServerCall();

export default server;
