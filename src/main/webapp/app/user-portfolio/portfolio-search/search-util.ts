import { gender } from '../user-portfolio.model';
/**The user portfolio search request */
export interface PortfolioSearchOption {
    /**If true that means to search by user login, otherwise search by gender */
    useLogin: Boolean;
    value: string | gender;
}
