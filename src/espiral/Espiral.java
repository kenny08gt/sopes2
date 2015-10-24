/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package espiral;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import static java.lang.Math.sqrt;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author alan
 */
public class Espiral {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here        
        /*String nodo = args[0];
        String inicio = args[1];        
        String fin = args[2];        */
        String nodo="0",inicio="500",fin="1000";        
        Espiral e = new Espiral();        
        e.iniciar(Integer.parseInt(nodo), Integer.parseInt(inicio),Integer.parseInt(fin));
    }

    public void iniciar(int id_nodo, int inicio,int fin) {        
        int m = 0, cont = inicio,otra=0;
        m = fin - inicio;
        int N = (int) ((sqrt(m) - 1) / 2);
        N = 2 * N + 1;
        //System.out.println("Filas y columnas: "+N);
        int[][] matriz = new int[N][N];
        int x = (int) (N / 2);
        int y = x;
        int arriba = 1, abajo = 2, derecha = 1, izquierda = 2;        
        while (otra < m) {
            //System.out.println("inicio while %d y %d\n",cont,m);
            int i = 0;
            for (i = 0; i < derecha && otra < m && x < N && y < N; i++) {
                cont++;
                otra++;
                matriz[x][y] = cont;
                x++;
            }
            i = 0;
            derecha += 2;
            for (i = 0; i < arriba && otra < m && x < N && y < N; i++) {
                cont++;
                otra++;
                matriz[x][y] = cont;
                y--;
            }
            i = 0;
            arriba += 2;
            for (i = 0; i < izquierda && otra < m && x < N && y < N; i++) {
                cont++;
                otra++;
                matriz[x][y] = cont;
                x--;
            }
            izquierda += 2;
            i = 0;
            for (i = 0; i < abajo && otra < m && x < N && y < N; i++) {
                cont++;
                otra++;
                matriz[x][y] = cont;
                y++;
            }
            abajo += 2;
            if (x == N || y == N) {
                break;
            }
        }
        graficar2(matriz, N);
    }
    private void graficar2(int[][] matriz, int n) {
        for (int j = 0; j < n; j++) {            
            for (int i = 0; i < n; i++) {                
                if (es_primo(matriz[i][j]) == 1) {
                    System.out.print("1,"); //si hay que pintar
                } else {
                    System.out.print("0,");  //0 si es normal
                }
            }            
            System.out.println("");
        }
    }
    private void graficar(int[][] matriz, int n) {
        System.out.println("graficar");
        PrintWriter writer = null;
        try {
            String nombre = "/home/alan/espiral.dot";
            //    std::cout<<nombre<<std::endl;
            String pf = "";
            pf = "digraph G {abc [shape=none, margin=0, label=< <TABLE BORDER=\"1\" CELLBORDER=\"0\" CELLSPACING=\"0\" CELLPADDING=\"0\" BGCOLOR=\"black\">";
            int i = 0, j = 0;
            for (j = 0; j < n; j++) {
                pf += "<tr>";
                for (i = 0; i < n; i++) {
                    //System.out.println("%d,%d hay %d\n",i,j,matriz[i][j]);                    

                    if (es_primo(matriz[i][j]) == 1) {
                        //pf+="<td BGCOLOR=\"lawngreen\">"+matriz[i][j]+"</td>";
                        pf += "<td width=\"25\" height=\"25\" fixedsize=\"true\"  BGCOLOR=\"lawngreen\"> * </td>";
                    } else {
                        //pf+="<td>"+matriz[i][j]+"</td>";
                        pf += "<td width=\"25\" height=\"25\" fixedsize=\"true\" > . </td>";
                    }
                }
                pf += "</tr>\n";
            }
            /**
             * **********************
             */
            pf += "</TABLE>>];\n}";
            writer = new PrintWriter(nombre, "UTF-8");
            writer.println(pf);
            writer.close();
        } catch (FileNotFoundException ex) {
            Logger.getLogger(Espiral.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(Espiral.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            writer.close();
        }
    }

    private int es_primo(int n) {
        if (n == 1) {
            return 0;
        }
        int i = 0, j = n - 1, c = 0;
        for (i = 0; i < n; i++) {
            if (j > 0 && (n % j) == 0) {
                c++;
            }
            if (c > 1) {
                return 0;
            }
            j--;
        }
        if (c > 1) {
            return 0;
        } else {
            return 1;
        }
        //1er  j=3 i=0 n=4 c=0
        //2da  j=2 i=1 n=4 c=1
        //3er  j=1 i=2 n=4 c=2
    }

}
