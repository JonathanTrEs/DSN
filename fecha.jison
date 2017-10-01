/* description: Parsea las fichas del fichero entrada.txt. */

/* Lexico de la gramatica*/

%lex
%%

\s+		/* skip whitespace */
\d+		return 'NUM'
[/-] 		return 'SEPARADOR'
. 		return 'INVALID'

/lex


/* preferencias de las asociaciones */
%left '-'
%start P

%% /* gramatica del lenguaje */
P	: 	FECHA 
		    {
		      return [$$];
		    }
;

FECHA 	:	NUM SEPARADOR NUM SEPARADOR NUM
		{ 
		  if(($1 > 0 && $1 < 32) && ($3 > 0 && $3 <13 ) && ($5 > 1950 && $5 < 2014)) 
		    {$$ = $1+" "+$3+ " "+$5;}
		  else {$$ = "La fecha introducida es incorrecta";}
		}
	;