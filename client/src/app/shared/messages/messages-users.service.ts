import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesUsersService {

  public minUser: number = 4;
  public maxUser: number = 50;
  public minPassword: number = 8;

  constructor() {}

  public validation = {
    'username': [
      { type: 'required', message: 'Le pseudo est obligatoire' },
      { type: 'minlength', message: `Il doit comprendre ${this.minUser} caratères minimun` },
      { type: 'maxlength', message: `Il ne doit pas depasser ${this.maxUser} caractères` },
      { type: 'pattern', message: 'Une MAJUSCULE et Un CHIFFRE est obligatoire et des minuscules' }
    ],
    'password': [
      { type: 'required', message: 'N\'oubliez pas de mettre un mot de passe' },
      { type: 'minlength', message: `Votre mot de passe doit comprendre ${this.minPassword} caractères` },
      { type: 'pattern', message: 'Il doit comprendre une minuscule, une majuscule, un nombre et un caractère spécial' }
    ],
    'passwordSingin' : [
      { type: 'required', message: 'N\'oubliez pas de mettre un mot de passe' },
    ],
    'confirmPassword': [
      { type: 'required', message: 'N\'oubliez pas de confirmer votre mot de passe' }
    ],
    'firstName': [
      { type: 'required', message: 'Le prénom est requis' },
      { type: 'minlength', message: `Il doit comprendre ${this.minUser} caratères minimun` },
      { type: 'maxlength', message: `Il ne doit pas depasser ${this.maxUser} caractères` },
      { type: 'pattern', message: 'Les caractères spéciaux sont interdit' }
    ],
    'lastName': [
      { type: 'required', message: 'Le prénom est requis' },
      { type: 'minlength', message: `Il doit comprendre ${this.minUser} caratères minimun` },
      { type: 'maxlength', message: `Il ne doit pas depasser ${this.maxUser} caractères` },
      { type: 'pattern', message: 'Les caractères spéciaux sont interdit' }
    ],
    'name': [
      { type: 'required', message: 'Le nom est requis'},
      { type: 'minlength', message: `Il doit comprendre ${this.minUser} caratères minimun` },
      { type: 'maxlength', message: `Il ne doit pas depasser ${this.maxUser} caractères` },
      { type: 'pattern', message: 'Les caractères spéciaux sont interdit' }
    ],
    'email': [
      { type: 'required', message: 'l\'Email est obligatoire' },
      { type: 'pattern', message: 'Votre adresse email n\'est pas valide' }
    ]
  }
}
