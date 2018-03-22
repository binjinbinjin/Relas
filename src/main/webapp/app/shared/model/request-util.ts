import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach((key) => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach((val) => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};

/**Return a HttpParams correspond to the input object
 * eg: {query: '1', gender: MALE} then HttpParams will have value query=1&gender=MALE
 *
 * */
export const creatRequestOptionWithoutPaging = (req?: any): HttpParams => {
  if(!req)
      throw Error("req cant be empty in "+ creatRequestOptionWithoutPaging());

  let option: HttpParams = new HttpParams();
  Object.keys(req).forEach((key)=> {
      option = option.set(key, req[key]);
  });

  return option;
};
