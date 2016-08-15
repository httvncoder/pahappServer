# pahapp

MEAN (Mongodb + Express + Angular + Nodejs)
### funcionalitats de l'API:

 **assemblies**
- crear new assamblea (user)
- get assemblies (all)
- get assembly by id
- get assembly by name
- auth users (login)

 **evictions**
 - get all evictions
 - post new eviction (cal estar logged)
 - delete eviction by id (cal estar logged)
 - delete eviction by title (cal estar logged)


---
### estructura base de dades

**assemblea** (des d'on es publiquen pròxims desnonaments)
- id: { type: String },
- name: { type: String },
- password: { type: String },
- mail:   { type: String },
- direction: { type: String },
- description:   { type: String },
- city:   { type: String },
- district: { type: String }

**eviction** (desnonament)
- title: { type: String },
- date: { type: String },
- hour:   { type: String },
- direction:   { type: String },
- description:   { type: String },
- access:   { type: String },
- city:   { type: String },
- district:   { type: String },
- assembly: { type: String }
