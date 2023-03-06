import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  createDatabase(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    });
  }
}
