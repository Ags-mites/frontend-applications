import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };

export const Switch1 = () => {
  return (
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
      <Switch {...label} disabled />
    </div>
  );
};
