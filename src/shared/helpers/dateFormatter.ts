import dateFormatter, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dateFormatter.extend(customParseFormat);
dateFormatter.extend(isoWeek);
dateFormatter.extend(quarterOfYear);
export type { Dayjs };
export default dateFormatter;
