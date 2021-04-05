import React, { useEffect } from "react";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useClassList } from "../../contexts/ClassListContext";
import { useClassSelect } from "../../contexts/ClassSelectContext";
import { ACTION_CLASS_SELECT_UPDATE } from "../../contexts/reducers/classSelect/ClassSelectActions";
import { updateClassList } from "../../contexts/util/ClassListUtil";

interface Props {
  height: number;
  width: number;
}

const useStyles = (height: number, width: number) => {
  let styles = makeStyles((theme) => ({
    root: {
      maxWidth: width,
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: height,
      margin: "auto",
    },
    listSection: {
      backgroundColor: "inherit",
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
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

  return (
    <div>
      <List className={classes.root} component="nav" aria-label="classlist">
        {classListState.classes.length > 0 ? (
          classListState.classes.map((_class, index) => (
            <ListItem
              button
              selected={classSelectState.classes?.map(_ => _.name).includes(_class.name)}
              onClick={(event) => handleListItemClick(event, index)}
              key={index}
            >
              <ListItemText primary={_class.name} />
            </ListItem>
          ))
        ) : (
          <ListItem unselectable="on" key={0}>
            <em>No classes</em>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default ClassesList;
