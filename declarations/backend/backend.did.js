export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getThemes' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], []),
  });
};
export const init = ({ IDL }) => { return []; };
