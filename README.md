# pahapp

frontend: https://github.com/arnaucode/pahappApp

MEAN (Mongodb + Express + Angular + Nodejs)


##To Do List:
**Backend and Frontend:**
```
-findAllAssemblies	                                                 --> done
-post new assembly                                                   --> done
-post new eviction to assembly                                       --> done

-api more secure and robust (comprovations, hash passwords, ...)

```
---
### estructura base de dades

```
**assemblea** (des d'on es publiquen pròxims desnonaments)
var assemblySchema = new Schema({
    id: { type: String },
    name: { type: String },
    password: { type: String },
    mail:   { type: String },
    phone: { type: Number },
    direction: { type: String },
    description:   { type: String },
    city:   { type: String },
    district: { type: String },
    evictions: [{
      id: { type: String },
      title: { type: String },
      date: { type: Date },
      direction: { type: String },
      description: { type: String },
      access: { type: String },
      city: { type: String },
      district: { type: String }
    }]
})
```
