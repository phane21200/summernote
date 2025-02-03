// Fonction pour effectuer une rotation de 45°
// Fonction pour effectuer une rotation autour du centre de l'élément
function rotateElement(evt, eltId, angle) {
  // Sélectionner l'élément à partir de son ID
  const element = document.getElementById(eltId);
  
  if (!element) {
    console.error(`Element avec l'ID "${eltId}" non trouvé.`);
    return;
  }
  
  // Obtenir la boîte englobante de l'élément
  const bbox = element.getBBox();
  const centerX = bbox.x + bbox.width / 2;
  const centerY = bbox.y + bbox.height / 2;
  
  // Calculer le nouvel angle (optionnellement, vous pouvez cumuler les angles)
  const currentTransform = element.getAttribute('transform') || '';
  const rotateMatch = currentTransform.match(/rotate\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);
  let newAngle = angle;
  
  if (rotateMatch) {
    newAngle = (angle) % 360;
  }
  
  // Appliquer la nouvelle rotation
  element.setAttribute('transform', `rotate(${newAngle}, ${centerX}, ${centerY})`);
}

// Fonction pour changer la couleur de remplissage du cercle
function Change_BP_color(evt, color) {
      const element = evt.currentTarget;
      // Changer la couleur de remplissage du cercle
      element.setAttribute('fill', color);
}

  // Fonction pour ajouter l'ombre à l'élément cible
  function addShadow(evt) {
    const svg = document.getElementById('Bp_Color');
    createDropShadowFilter(svg); // Assurez-vous que le filtre est créé

    const element = evt.currentTarget;
    element.setAttribute('filter', 'url(#dynamicShadow)');
  }

  // Fonction pour retirer l'ombre de l'élément cible
  function removeShadow(evt) {
    const element = evt.currentTarget;
    element.removeAttribute('filter');
  }


// Fonction pour réinitialiser la couleur lorsque la souris quitte l'élément
function send(evt,adr,val) {
  const element = evt.currentTarget;

  // afficher un message contenant l'adresse et la valeur
  alert("Adresse : " + adr + " Valeur : " + val);
}

// Fonction pour réinitialiser la couleur lorsque la souris quitte l'élément
function SelectMode(evt,adr,val) {
  const element = evt.currentTarget;

  switch (val) {
    case "Auto":
      rotateElement(evt,"groupe-aiguille",45);
      break;
    case "Manu":
      rotateElement(evt,"groupe-aiguille",-45);
      break;
    case "Stop":
      rotateElement(evt,"groupe-aiguille",0);
      break;
  }

  // afficher un message contenant l'adresse et la valeur
  // alert("Adresse : " + adr + " Valeur : " + val);
}

  // Fonction pour créer et ajouter le filtre de drop shadow au SVG
  function createDropShadowFilter(svg) {
    // Vérifier si le SVG contient déjà un élément <defs>, sinon le créer
    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defs);
    }

    // Vérifier si le filtre existe déjà
    if (!svg.querySelector('#dynamicShadow')) {
      // Créer le filtre
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', 'dynamicShadow');
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      // Créer l'élément feDropShadow
      const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
      feDropShadow.setAttribute('dx', '0'); // Décalage horizontal
      feDropShadow.setAttribute('dy', '0'); // Décalage vertical
      feDropShadow.setAttribute('stdDeviation', '4'); // Flou
      feDropShadow.setAttribute('flood-color', '#000000'); // Couleur de l'ombre
      feDropShadow.setAttribute('flood-opacity', '0.5'); // Opacité de l'ombre

      // Ajouter feDropShadow au filtre
      filter.appendChild(feDropShadow);

      // Ajouter le filtre aux defs
      defs.appendChild(filter);
    }
  }

  function Timer(evt, id, delay, color_1, color_2) {
    // Récupérer l'élément par son ID
    const element = document.getElementById(id);
    
    if (!element) {
      console.error(`Élément avec l'ID "${id}" non trouvé dans Timer.`);
      return;
    }
  
    // Appliquer la première couleur immédiatement
    if (color_1) {
      element.setAttribute('fill', color_1);
    }
  
    // Définir une variable pour suivre l'état actuel de la couleur
    let isColor1 = true;
  
    // Utiliser setInterval pour alterner les couleurs à chaque intervalle
    setInterval(function() {
      if (isColor1) {
        element.setAttribute('fill', color_2);
      } else {
        element.setAttribute('fill', color_1);
      }
      isColor1 = !isColor1;
      console.log(`Timer: Couleur changée pour l'élément ID: ${element.id}.`);
    }, delay);
  }
  