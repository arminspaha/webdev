import * as moment from "moment";
import * as _ from "lodash";

import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "orderByDate",
  pure: false
})
export class OrderByDatePipe implements PipeTransform {
  transform(value: any, args: string): any {
    if (!value || value === undefined || value.length === 0) {
      return value;
    }

    const sortedValue = _.sortBy(value, object =>
      moment(object.date)
    ).reverse();
    return sortedValue;
  }
}
