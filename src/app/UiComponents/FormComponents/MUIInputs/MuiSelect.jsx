import {CircularProgress, FormControl, FormHelperText, InputLabel, Select} from "@mui/material";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export default function MuiSelect({
                                      select,
                                      register,
                                      errors,
                                  }) {
    const selectData = select.data;
    const options = selectData.options;
    const [value, setValue] = useState(selectData.defaultValue || "");

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
          <FormControl
                sx={select.sx ? select.sx : {minWidth: 120, width: "100%", mb: 2}}
                error={Boolean(errors[selectData.id])}
          >
              <InputLabel id={selectData.label}>{selectData.label}</InputLabel>
              <Select
                    {...register(selectData.id, select.pattern)}
                    {...selectData}
                    value={value}
                    onChange={handleChange}
              >

                  {selectData.loading ?
                        <CircularProgress color="inherit" size={20}/>
                        :
                        options?.map((item) => {
                            return (
                                  <MenuItem value={item.id} key={item.id}>
                                      {item.name}
                                  </MenuItem>
                            );
                        })}
              </Select>
              <FormHelperText>{errors[selectData.id]?.message}</FormHelperText>
          </FormControl>
    );
}
