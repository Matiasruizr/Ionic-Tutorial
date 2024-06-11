import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbTaskService {
  public database?: SQLiteObject;
 
  listSessions = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform) {
    console.log("DB Service initialized")
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'sessions.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        console.log("DB created");
        this.database = db;
        this.createTables();
        this.findSessions();
        this.registerSession("matias", 12345);
        this.isDbReady.next(true);
      }).catch(e => console.log("error creating db", e));
    })
  }

  // o	Crear una función que genere las tablas necesarias para el funcionamiento de la aplicación. 
  async createTables() {
    const sessionTable: string = "CREATE TABLE IF NOT EXISTS session_data(user_name VARCHAR(8) PRIMARY KEY NOT NULL, password INTEGER NOT NULL, active INTEGER NOT NULL);";
    return this.database?.executeSql(sessionTable, [])
      .then(res => console.log('Tabla creada ', res))
      .catch(e => console.log('error creando la tabla', e));
  }


  // o	Generar una función que consulte si existe alguna sesión activa.
  async activeSessionExists() {
    return this.database?.executeSql('SELECT * FROM session_data WHERE active = 1', [])
      .then(res => {
        if (res.rows.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  // o	Generar una función que valide la existencia de un usuario que inicia sesión. 
  async validateUser(user_name: string, password: number | null) {
    return this.database?.executeSql('SELECT * FROM session_data WHERE user_name = ? AND password = ?', [user_name, password])
      .then(res => {
        if (res.rows.length > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  // o	Generar una función que permita el registro de una sesión. 
  async registerSession(user_name: string, password: number) {
    let data = [user_name, password, 0];
    return this.database?.executeSql('INSERT INTO session_data(user_name, password, active) VALUES (?, ?, ?)', data)
      .then(res => {
        console.log(res);
        this.findSessions();
      });
  }

  // o	Generar una función que permita actualizar el estado de active de una sesión.
  async updateSession(user_name: string, active: number) {
    let data=[active, user_name];
    return this.database?.executeSql('UPDATE session_data SET active = ? WHERE user_name = ?', data)
    .then(res =>{
      console.log(res)
      this.findSessions()
    })
  }

  // o	Generar una función que permita consultar una sesión.
  async findSession(user_name: string) {
    return this.database?.executeSql('SELECT * FROM session_data WHERE user_name = ?', [user_name])
      .then(res => {
        if (res.rows.length > 0) {
          console.log(
            "Usuario", {
              username: res.rows.item(0).username,
              active: res.rows.item(0).active,
            }
          )
          return {
            username: res.rows.item(0).username,
            active: res.rows.item(0).active,
          }
        } else {
          return null;
        }
      });
  }

  // o	Generar una función que permita consultar todas las sesiones.
  async findSessions() {
    return this.database?.executeSql('SELECT * FROM session_data', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            username: res.rows.item(i).username,
            active: res.rows.item(i).active,
          });
          console.log("Usuario: " + res.rows.item(i).username + " Activo: " + res.rows.item(i).active);
        }
      }
      // this.listSessions.next(items);
    });
  }

  // o	Generar una función que permita eliminar un registro.
  async deleteSession(user_name: string) {
    return this.database?.executeSql('DELETE FROM session_data WHERE user_name = ?', [user_name])
      .then(res => {
        console.log(res);
        this.findSessions();
      });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchNoticias(): Observable<any> {
    return this.listSessions.asObservable();
  }
}
