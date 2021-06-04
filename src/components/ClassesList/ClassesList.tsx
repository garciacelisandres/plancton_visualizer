import "./ClassesList.css";

import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useClassList } from "../../contexts/ClassListContext";
import { useClassSelect } from "../../contexts/ClassSelectContext";
import {
  ACTION_CLASS_SELECT_DELETE,
  ACTION_CLASS_SELECT_UPDATE,
} from "../../contexts/reducers/classSelect/ClassSelectActions";
import { updateClassList } from "../../contexts/util/ClassListUtil";
import AutorenewIcon from "@material-ui/icons/Autorenew";

interface Props {
  height: number;
  width: number;
}

const useStyles = (height: number, width: number) => {
  let styles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignContent: "space-between",
      justifyContent: "space-between",
      height: "inherit",
    },
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: height,
    },
    listSection: {
      backgroundColor: "inherit",
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
    button: {},
  }));
  return styles();
};

const ClassesList = ({ height, width }: Props) => {
  const classes = useStyles(height, width);
  const { classListState, classListDispatch } = useClassList();
  const { classSelectState, classSelectDispatch } = useClassSelect();

  useEffect(() => {
    updateClassList(classListDispatch, classSelectDispatch);
  }, []);

  const reloadClasses = () => {
    updateClassList(classListDispatch, classSelectDispatch);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    let selectedClass = classListState.classes[index];
    classSelectDispatch({
      type: ACTION_CLASS_SELECT_UPDATE,
      class: selectedClass,
    });
  };

  const handleDeleteSelection = () => {
    let anyClass = classListState.classes.pop();
    if (anyClass) {
      classSelectDispatch({
        type: ACTION_CLASS_SELECT_DELETE,
        class: anyClass,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <p>Classes list:</p>
        <List className={classes.list} component="nav" aria-label="classlist">
          {classListState.classes.length > 0 ? (
            classListState.classes.map((_class, index) => (
              <ListItem
                button
                selected={classSelectState.classes
                  ?.map((_) => _.name)
                  .includes(_class.name)}
                onClick={(event) => handleListItemClick(event, index)}
                key={index}
              >
                <ListItemText primary={_class.name} />
              </ListItem>
            ))
          ) : (
            <ListItem unselectable="on" key={0} className="no-classes-found">
              <p>No classes found</p>
              <IconButton onClick={reloadClasses}>
                <AutorenewIcon />
              </IconButton>
            </ListItem>
          )}
        </List>
      </div>
      <Button className={classes.button} onClick={handleDeleteSelection}>
        Delete selection
      </Button>
    </div>
  );
};

export default ClassesList;
