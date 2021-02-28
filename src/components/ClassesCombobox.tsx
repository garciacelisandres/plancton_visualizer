import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Class } from "../model/Class";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import classStore from "../stores/ClassStore";

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
  const [classes, setClasses] = useState<Class[]>();
  const [selected, setSelected] = useState<Class | undefined>(
    classStore.getSelected()
  );

  const styles = useStyles();

  useEffect(() => {
    classStore.attach(setClasses);
    return function cleanup() {
      classStore.dettach(setClasses);
    };
  });

  useEffect(() => {
    classStore.attachSelect(setSelected);
    return function cleanup() {
      classStore.dettachSelect(setSelected);
    };
  });

  const changeSelected = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ): void => {
    let selectedClass = classes?.find(
      (_class) => _class.name === event.target.value
    );
    classStore.setSelected(selectedClass);
  };

  return (
    <FormControl className={styles.formControl}>
      <InputLabel htmlFor="grouped-select">Class</InputLabel>
      <Select
        defaultValue=""
        displayEmpty
        id="grouped-select"
        onChange={changeSelected}
        value={selected}
      >
        {classes?.map((_class, index) => (
          <MenuItem key={_class.name} value={_class.name}>
            {_class.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassesCombobox;
