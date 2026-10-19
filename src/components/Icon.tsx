import Svg, { Circle, Line, Path, Polygon, Polyline } from 'react-native-svg';
import { colors } from '../theme';

// Feather icons (https://feathericons.com) on their 24x24 grid.
const shapes = {
  home: (
    <>
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <Polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  heart: (
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
  compass: (
    <>
      <Circle cx="12" cy="12" r="10" />
      <Polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  user: (
    <>
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </>
  ),
  search: (
    <>
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  'arrow-left': (
    <>
      <Line x1="19" y1="12" x2="5" y2="12" />
      <Polyline points="12 19 5 12 12 5" />
    </>
  ),
  'arrow-right': (
    <>
      <Line x1="5" y1="12" x2="19" y2="12" />
      <Polyline points="12 5 19 12 12 19" />
    </>
  ),
};

export type IconName = keyof typeof shapes;

type Props = { name: IconName; size?: number; color?: string; fill?: string };

export function Icon({
  name,
  size = 24,
  color = colors.ink,
  fill = 'none',
}: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[name]}
    </Svg>
  );
}
