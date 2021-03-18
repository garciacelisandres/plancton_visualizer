import React, { useEffect } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useClassList } from "../contexts/ClassListContext";
import { useClassSelect } from "../contexts/ClassSelectContext";
import { ACTION_CLASS_SELECT_UPDATE } from "../contexts/reducers/classSelect/ClassSelectActions";
import { updateClassList } from "../contexts/util/ClassListUtil";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const ClassesCombobox = (props: Props) => {
  const { classListState, classListDispatch } = useClassList();
  const { classSelectState, classSelectDispatch } = useClassSelect();

  const styles = useStyles();

  useEffect(() => {
    updateClassList(classListDispatch, classSelectDispatch);
  }, []);

  const changeSelected = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ): void => {
    let classes = [...classListState.classes];
    let selectedClass = classes?.find(
      (_class) => _class.name === event.target.value
    );
    classSelectDispatch({
      type: ACTION_CLASS_SELECT_UPDATE,
      class: selectedClass,
    });
  };

  return (
    <FormControl className={styles.formControl}>
      <InputLabel htmlFor="class-select">Class</InputLabel>
      <Select
        defaultValue={classSelectState.class}
        displayEmpty
        id="class-select"
        data-testid="class-select"
        onChange={changeSelected}
        value={classSelectState.class}
        aria-label="class-select"
      >
        {classListState.classes?.map((_class, index) => (
          <MenuItem key={_class.name} value={_class.name}>
            {_class.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassesCombobox;
