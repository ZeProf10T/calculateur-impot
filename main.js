// Décomposition en 5 tranches notées de A à E
const SEUIL_A = 10064
const SEUIL_B = 25659
const SEUIL_C = 73369
const SEUIL_D = 157806


// Pourcentage d'impot pour chaque tranche
const PERC_A = 0
const PERC_B = 0.11
const PERC_C = 0.30
const PERC_D = 0.41
const PERC_E = 0.45


// Ensemble des inputs
var coupleInput = document.getElementById('couple')
var enfantsInput = document.getElementById('enfants')
var revenuInput = document.getElementById('revenu')
var impotInput = document.getElementById('impot')
var netInput = document.getElementById('net')

var table = document.getElementById('table')

function repartition(somme) {
  repart = { a: 0, b: 0, c: 0, d: 0, e: 0}
  reste = somme


  if (reste > SEUIL_D) {
    repart.e = reste - SEUIL_D
    reste -= repart.e
  }

  if (reste > SEUIL_C) {
    repart.d = reste - SEUIL_C
    reste -= repart.d
  }

  if (reste > SEUIL_B) {
    repart.c = reste - SEUIL_B
    reste -= repart.c
  }

  if (reste > SEUIL_A) {
    repart.b = reste - SEUIL_A
    reste -= repart.b
  }

  repart.a = reste

  return repart
}


function calculImpot(somme, parts) {
    somme = somme / parts

    repart = repartition(somme)

    tab = {
        a: repart.a * PERC_A * parts,
        b: repart.b * PERC_B * parts,
        c: repart.c * PERC_C * parts,
        d: repart.d * PERC_D * parts,
        e: repart.e * PERC_E * parts
    }

    impot = Math.floor(tab.a + tab.b + tab.c + tab.d + tab.e)
    somme = somme * parts
    net = somme - impot

    return impot, net, tab
}


function final() {
  parts = 1 + 0.5 * enfantsInput.value + (coupleInput.checked ? 1 : 0)
  impot, net, data = calculImpot(revenuInput.value, parts)

  impotInput.value = impot
  netInput.value = net

  generateTable(data)
}

function generateTable(data) {
    table.innerHTML = "<thead><tr><th>Tranche</th><th>Impôt</th></tr></thead>\
    <tbody> \
    <tr> <td>" + (SEUIL_A + 1) + " à " + SEUIL_B + " </td> <td>" + data.b + "</td> </tr> \
    <tr> <td>" + (SEUIL_B + 1) + " à " + SEUIL_C + " </td> <td>" + data.c + "</td> </tr> \
    <tr> <td>" + (SEUIL_C + 1) + " à " + SEUIL_D + " </td> <td>" + data.d + "</td> </tr> \
    <tr> <td>" + (SEUIL_D + 1) + " et plus </td> <td>" + data.e + "</td> </tr> \
    <tbody>"
}


// Ecoute des evenements
coupleInput.addEventListener('input', function() {
  final()
})

enfantsInput.addEventListener('input', function() {
  final()
})

revenuInput.addEventListener('input', function() {
  final()
})
