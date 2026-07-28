# Domain Model

## User

Representa al propietario de la cuenta.

### Relaciones

- Tiene un Profile.
- Tiene un SearchProfile.
- Tiene muchas Jobs.
- Tiene muchas Applications.

---

## Job

Representa una vacante encontrada.

Puede existir sin que el usuario haya aplicado.

### Relaciones

- Pertenece a un User.
- Puede convertirse en una Application.
- Puede marcarse como Favorite.

---

## Application

Representa una postulación realizada a una vacante.

### Relaciones

- Pertenece a un Job.
- Tiene muchas Notes.
- Tiene muchos Attachments.
- Tiene un Timeline.
- Puede tener varios Recruiters.

---

## Note

Registro cronológico de eventos durante el proceso.

---

## Attachment

Archivos asociados a una Application.

Ejemplo:

- CV
- Cover Letter
- Oferta laboral

---

## Recruiter

Persona de contacto durante el proceso.

Puede almacenar:

- Nombre
- Email
- LinkedIn
- Empresa

---

## Insight

Conclusión generada por IA basada en múltiples Applications.

Ejemplo:

- Tu cuello de botella es la entrevista técnica.
- AWS aparece en el 65% de las vacantes.

---

## Recommendation

Acciones sugeridas por IA para mejorar las probabilidades de éxito.
