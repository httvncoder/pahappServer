# pahapp

MEAN (Mongodb + Express + Angular + Nodejs)
### funcionalitats de l'API:

 **users**:
- crear
- get users
- auth users (login)

 **evictions**:
 - post new eviction
 - get all evictions


---
### estructura base de dades

**user**
- username: { type: String },
- password: { type: String },
- description:   { type: String },
- icon:   { type: String },
- mail:   { type: String },
- admin: { type: Boolean }

**eviction** (desnonament)
- title: { type: String },
- day: { type: String },
- hour:   { type: String },
- direction:   { type: String },
- description:   { type: String },
- access:   { type: String },
- city:   { type: String },
- district:   { type: String }
