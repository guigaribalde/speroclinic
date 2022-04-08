# ROTAS DE PRESCRIÇÃO

## **GET '/prescription'**

### RETORNO: CODE 200

```json
[
  {
    "prescription": {
      "immunohistochemistry": "",
      "tnm_staging": "",
      "clinic_state": "",
      "cid": "",
      "therapeutic_plan": "",
      "treatment": "",
      "cicle": ""
    },
    "patient": {
      "id": "",
      "name": "",
      "mother_name": "",
      "email": "",
      "cpf": "",
      "phone": "",
      "address": "",
      "CEP": "",
      "health_plan": {"name": "", "number": ""},
      "birth_day": "",
      "weight": {"value": 0, "mesure": ""},
      "height": {"value": 0, "mesure": ""},
      "patology": "",
      "gender": "",
      "alergy": "",
      "obs": ""
    },
    "protocol": {"id": "", "name": ""},
    "requisites": [
      {
        "type": "",
        "scientific_name": "",
        "id": "",
        "presentations": [
          {
            "id": "",
            "concentration": {"value": 0, "mesure": ""},
            "name": "",
            "buy": 0,
            "sell": 0,
            "quantity": 0,
            "type": "",
            "lab": "",
            "infusion": {
              "time": 0,
              "type": ""
            }
          }
        ]
      },
      {
        "type": "",
        "group": "",
        "id": "",
        "quantity": 0,
        "buy": 0,
        "sell": 0,
        "name": ""
      }
    ]
  }
]
```

## **GET '/prescription?id=id'**

### RETORNO: CODE 200

```json
{
  "patient_id": "",
  "patient_name": "",
  "prescription_code": "",
  "prescription_id": "",
  "protocols": [{"id": "", "name": ""}],
  "requisites": [
    {
      "title": "",
      "type": "",
      "id": "",
      "concentration": {"value": "", "mesure": ""},
      "infusion_time": "",
      "quantity": 0
    }
  ]
}
```

## **POST '/prescription'**

### ENVIO:

```json
{
  "prescription": {
    "immunohistochemistry": "",
    "tnm_staging": "",
    "clinic_state": "",
    "cid": "",
    "terapeuthic_plan": "",
    "treatment": "",
    "cicle": ""
  },
  "patient": {
    "id": "",
    "name": "",
    "mother_name": "",
    "email": "",
    "cpf": "",
    "phone": "",
    "address": "",
    "CEP": "",
    "health_plan": {"name": "", "number": ""},
    "birth_day": "",
    "weight": {"value": 0, "mesure": ""},
    "height": {"value": 0, "mesure": ""},
    "patology": "",
    "gender": "",
    "alergy": "",
    "obs": ""
  },
  "protocols": [],
  "requisites": [
    {
      "type": "",
      "id": "",
      "concentration": {"value": "", "mesure": ""},
      "infusion_time": "",
      "quantity": 0
    }
  ]
}
```

## **PUT '/prescription?id=id'**

### ENVIO:

```json
{
  "patient_id": "",
  "prescription_code": "",
  "protocols": [],
  "requisites": [
    {
      "type": "",
      "id": "",
      "concentration": {"value": "", "mesure": ""},
      "infusion_time": "",
      "quantity": 0
    }
  ]
}
```

## **DELETE '/prescription?id=id'**
