export default interface ITopMenuElementProps {
  label: string;
  state?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'selected';
  to?: RouteTo;
}

type RouteTo = {
  name: string;
};
