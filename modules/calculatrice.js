
function calcul(expression) {
    try {
      // Supprime le signe "=" et évalue l'expression
      const result = eval(expression.slice(1));
      // return 
        return 'le resutat de ' + expression.slice(1) + ' est ' + result.toString();


    } catch (error) {
      return 'Erreur de syntaxe ou de calcul';
    }
  }
  
  module.exports = calcul;