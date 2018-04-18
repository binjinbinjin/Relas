import { Injectable } from '@angular/core';
import { Principal } from './principal.service';
import { CanActivate } from '@angular/router';

@Injectable()
/**
 * Active guard, to make sure user is loggin
 */
export class MakeSureIsLoginGuardService implements CanActivate  {

  constructor(private principal: Principal) { }

  canActivate(): boolean {
    if (this.principal.getUserLogin)
      return true;
    return false;
  }
}
