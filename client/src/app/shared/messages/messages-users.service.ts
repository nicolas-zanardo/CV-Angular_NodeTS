import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesUsersService {

  public maxCharacters: number = 100;
  public minPassword: number = 8;
  public maxNumberPhone: number = 20;
  public minNumberPhone: number = 10;

  constructor() {}

  public validation = {
    'company': [
      { type: 'required', message: 'Veuillez renseigner le nom de votre entreprise' },
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxCharacters}`}
    ],
    'password': [
      { type: 'required', message: 'N\'oubliez pas de mettre un mot de passe' },
      { type: 'minlength', message: `Votre mot de passe doit comprendre ${this.minPassword} caractères` },
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxCharacters}`},
      { type: 'pattern', message: 'Il doit comprendre une minuscule, une majuscule, un nombre et un caractère spécial' }
    ],
    'phone': [
      { type: 'minlength', message: `Nombre de caractère minium ${this.minNumberPhone}`},
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxNumberPhone}`},
      { type: 'pattern', message: `Fomat :  +33512345678 - 0033512345678 - 0612345678`}
    ],
    'confirmPassword': [
      { type: 'required', message: 'Veuillez confirmer votre mot de passe' }
    ],
    'firstName': [
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxNumberPhone}`},
      { type: 'required', message: 'Le prénom est requis' },
    ],
    'lastName': [
      { type: 'maxlength', message: `Nombre de caractère maximum ${this.maxNumberPhone}`},
      { type: 'required', message: 'Le nom est requis' },
    ],
    'email': [
      { type: 'required', message: 'l\'Email est obligatoire' },
      { type: 'pattern', message: 'Votre adresse email n\'est pas valide' }
    ]
  }
}
