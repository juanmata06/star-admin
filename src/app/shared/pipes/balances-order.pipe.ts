import { Pipe, PipeTransform } from '@angular/core';
import { iBalance } from '../../interfaces/balance.interface';

@Pipe({
  name: 'balancesOrder'
})
export class BalancesOrderPipe implements PipeTransform {

  transform(items: iBalance[]): iBalance[] {
    if (!items) return [];
    return [...items].sort((a, b) => {
      if (a.type === 'income' && b.type === 'expense') {
        return -1;
      } else if (a.type === 'expense' && b.type === 'income') {
        return 1;
      }
      return 0;
    });
  }

}
