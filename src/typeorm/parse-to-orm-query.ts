import {
  LessThan,
  MoreThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Between,
  Equal,
  Like,
  In,
  FindOperator
} from 'typeorm';
import { convertToObject } from '../helpers';
import { ParsedOrmWhere, Struct } from '../types';

/**
 * Parse query to TypeOrm valid query
 * covert hello__lt to LessThan
 * First part is property name, second part is comparison key
 * If no key is provided it will assume equal
 */
export function parseQuery<T = any>(
  query: Struct | string | null | undefined
): ParsedOrmWhere<T> {
  // Query might be stringified json, or null. Convert to object first.
  const queryObject = convertToObject(query);
  // Here we will put processed filters
  const typeOrmQuery: ParsedOrmWhere = {};

  // For every key value pair
  Object.keys(queryObject).forEach(filter => {
    // Get value
    const value = queryObject[filter];
    // Seperate name and comparison parts
    const [name, comparison] = `${filter}`.split('__');
    // Use provided comparison part
    // Don't filter pagination
    if (filter.startsWith('pg')) return;

    switch (comparison) {
      case 'lt':
        typeOrmQuery[name] = LessThan(value);
        break;
      case 'lte':
        typeOrmQuery[name] = LessThanOrEqual(value);
        break;
      case 'gt':
        typeOrmQuery[name] = MoreThan(value);
        break;
      case 'gte':
        typeOrmQuery[name] = MoreThanOrEqual(value);
        break;
      case 'lk':
        typeOrmQuery[name] = Like(`%${value}%`);
        break;
      case 'in':
        try {
          const arr = typeof value === 'string' ? JSON.parse(value) : value;
          if (Array.isArray(arr)) {
            typeOrmQuery[name] = In(value);
          }
        } catch (error) {
          //
        }
        break;
      case 'btw':
        try {
          const btw = typeof value === 'string' ? JSON.parse(value) : value;

          if (Array.isArray(btw) && btw.length === 2) {
            typeOrmQuery[name] = Between(btw[0], btw[1]);
          }
        } catch (error) {
          //
        }
        break;
      // If it isn't provided, check if value is instance of FindOperator,
      // that means that somewhere else in the app this value was parsed,
      // and just save it, othervise assume equal
      default:
        if (value instanceof FindOperator) {
          typeOrmQuery[name] = value;
        } else {
          typeOrmQuery[name] = Equal(value);
        }
        break;
      // This option can be abused. Better use manually,
      // then to let someone bypass parsing query
      // case 'man':
      //   // Do nothing, handle manually. If not handled TypeOrm will assume Eq
      //   typeOrmQuery[`${name}__man`] = value;
      //   break;
    }
  });

  return typeOrmQuery;
}
