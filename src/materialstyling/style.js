import {withStyles} from "@material-ui/core/styles"



const useStyles =theme=>{
    return ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      })
}

export default withStyles(useStyles)