import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import {inject} from '@angular/core'
import { SharedService } from './services/shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const s = inject(SharedService);
  if(authService.getToken()){
    return true;
  }else{
    s.show.emit(false)
    router.navigate(['/login'])
    return false
  }
};
