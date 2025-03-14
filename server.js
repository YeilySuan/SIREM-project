import express from 'express';
const { handler } = await import('./build/handler.js');
import db from './db-connection.js';
import 'dotenv/config';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { json } from '@sveltejs/kit';

const PORT = process.env.DB_PORT || 8080;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static('public'));

// Habilitar CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos generados por SvelteKit
app.use(express.static(path.join(__dirname, 'static')));

// Ruta para manejar la solicitud de SvelteKit desde el build
app.use(handler);
/*
app.all('*', (req, res) => {
    return handler(req, res);

  });
*/
/*
app.get('/', (req, res) => {
    res.sendFile('./src/app.html', { root: __dirname });
});
*/
/*
app.all('*', (req, res) => {
    res.status(404).send('Página no encontrada');
});
*/

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

(async function () {
    let adminIdCard = "admin";
    let adminFullName = "Yeily Ortiz";
    let adminEmail = "yeily@gmail.com";
    let adminPassword = "SiremYeily";
    let adminRole = "Administrativo";

    const queryCheckAdmin = "SELECT * FROM usuarios WHERE Cedula = ? OR Correo_electronico = ?";
    const queryCreateAdmin = "INSERT INTO usuarios (Cedula, Nombre_completo, Correo_electronico, Contraseña) VALUES (?, ?, ?, ?)";
    const queryRolAdmin = "INSERT INTO roles (Tipo_rol, Id_usuarios) VALUES (?, ?)";

    
    db.query(queryCheckAdmin, [adminIdCard, adminEmail], (err, results) => {
        if (err) {
            return console.error("Error verificando la existencia del usuario:", err);
        }

        if (results.length > 0) {
            console.log("El usuario administrador ya existe.");
        } else {

            db.query(queryCreateAdmin, [adminIdCard, adminFullName, adminEmail, adminPassword], (err, result) => {
                if (err) {
                    return console.error("Error al crear el usuario admin:", err);
                }

                const userId = result.insertId; 
                
                db.query(queryRolAdmin, [adminRole, userId], (err, result) => {
                    if (err) {
                        return console.error("Error al agregar el rol admin:", err);
                    }
                    console.log("Usuario administrador creado correctamente con rol Administrativo.");
                });
            });
        }
    });
})();




/*
app.post('/api/submit', (req, res) => {

    const { userIdCard, userFullName, userEmail, userPassword, userRol } = req.body;
  
    const usersQuery = 'INSERT INTO usuarios (Cedula, Nombre_completo, Correo_electronico, Contraseña) VALUES (?, ?, ?, ?)';
    

    db.query(usersQuery, [userIdCard, userFullName, userEmail, userPassword], (err, result) => {
      if (err) {
       return res.status(500).send(err);
      }

      console.log('resultado de la inserccion', result);

      const userId = result.insertId;
    

      const rolQuery = 'INSERT INTO roles (Tipo_rol, Id_usuarios) VALUES (?, ?)';

      db.query(rolQuery, [userRol, userId], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
      
        res.status(200).json({ message: 'usuario registrado', id: userId });
      
        });

    });

});
*/
//crear medicamento yeily

/*
app.post('/api/createMedicamentos', (req, res) => {
    const{ barCode, name, dose, presentation, numberLot, amount, laboratory, dateExpiration, idUsuarioMed } = req.body;

    const medicamentoQuery = 'INSERT INTO medicamentos (Codigo_barras, Nombre, Dosis, Presentacion, Id_usuarios) VALUES (?,?,?,?,?)';


    db.query(medicamentoQuery, [barCode, name, dose, presentation, idUsuarioMed], (err, result) =>{
        if(err){
            return res.status(500).send(err);
        }
        const medicamentoId = result.insertId;

        const loteQuery = 'INSERT INTO lotes (Numero_lote, Cantidad, Laboratorio, Fecha_vencimiento, Id_Medicamento) VALUES(?,?,?,?,?)' ;

        db.query(loteQuery, [numberLot, amount, laboratory,dateExpiration, medicamentoId], (err) => {
            if(err){
                return res.status(500).send(err);
            }
            res.status(200).json({message: 'Medicamento y Lote registrados exitosamente', id: medicamentoId });
        });
    });
});
*/  
/*
app.post('/api/validateLogginToMainMenu', (req, res) => {
    const { logginCedula, logginPassword } = req.body;

    const validateUserAndPass = `SELECT * FROM usuarios WHERE Cedula = ?`;

    db.query(validateUserAndPass, [logginCedula], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: 'Error en el servidor'});
        }

        if (results.length === 0) {
            return res.status(401).json({message: 'Usuario no encontrado'});
        }

        const user = results[0];

        if (user.Contraseña === logginPassword) {
            return res.status(200).json({message: 'Autenticacion Exitosa'});
        } else {
            return res.status(401).json({message: 'Usuario o contraseña Incorrectas'});
        }

    });

});
*/
//final de crear medicamento yeily
/*
app.post('/validateAdmin', (req, res) => {
    const {username, password } = req.body;

    const validateAdminQuery = `SELECT u.*, r.Tipo_rol
                                FROM roles r
                                JOIN usuarios u ON r.Id_usuarios = u.Id_usuarios
                                WHERE u.Cedula = ? `;


    db.query(validateAdminQuery, [username], (err, result) => {
        if (err) return res.status(500).send('Error en la base de datos');
        if (result.length === 0) return res.status(401).send('Usuario no encontrado');

        const user = result[0];
        
        if (user.Contraseña === password) {
            if (user.Tipo_rol === 'Administrativo') {                

                return res.status(200).json({ message: 'Acceso concedido' });
            } else {
                return res.status(403).json({ message: 'Acceso denegado' });
            }
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }


    })
})
*/
//obtener medicamento por busqueda main page
/*
app.get('/api/getMedicineSearchButton', (req, res) => {
    const { barCode } = req.query;

    const querySearchMedicine = `
    SELECT  m.Nombre, m.Presentacion, l.Numero_lote, l.Fecha_vencimiento, l.Cantidad, l.Laboratorio
    FROM medicamentos m
    JOIN lotes l ON m.Id_medicamento = l.Id_medicamento
    WHERE m.Codigo_barras = ?`;

    db.query(querySearchMedicine, [barCode], (err, result) => {
        if (err) {
            console.error("Error en la consulta a base de datos", err)
            return res.status(500).send("Error al realizar consulta")
        } 
        console.log(res.json(result))     
    });
});
*/


//recibir los datos en base de datos para el buscar-eliminar //
/*
app.get('/api/medicamentos/:barCode', (req, res) => {
    const barCode = req.params.barCode;

    const query = 'SELECT * FROM medicamentos WHERE Codigo_barras = ?';
    
    db.query(query, [barCode], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        
        if (Array.isArray(results) && results.length === 0) {
            return res.status(404).json({ message: 'Medicamento no encontrado' });
        }

        
        res.status(200).json(results[0]);
    });
});
*/

/*codigo para obtener el medicamento por barCode en main page*/
/*
app.get('/api/getMedicamentos/:barCode', (req, res) => {

    const barCode = req.params.barCode;


    const queryMostrarDatosABorrar = `select 
                                            m.Nombre,
                                            m.Codigo_barras, 
                                            m.Presentacion,
                                            m.Dosis,
                                            l.Numero_lote,
                                            l.Cantidad,
                                            l.Fecha_vencimiento,
                                            l.Laboratorio
                                        from medicamentos as m
                                        inner join lotes as l
                                        on m.Id_medicamento = l.Id_Medicamento
                                        where m.Codigo_barras = ?
                                        limit 1`;

    db.query(queryMostrarDatosABorrar, [barCode], (err, result) => {
        if (err) {
            throw Error;
        }
        res.json(result);
    });
});
*/
/*
    const deleteQuery = 'DELETE FROM medicamentos WHERE Id_medicamento = ?';

    db.query(deleteQuery, [barCode], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        // 'result' es un objeto ResultSetHeader
        // Se puede acceder a affectedRows directamente desde 'result'
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medicamento no encontrado' });
        }

        res.status(200).json({ message: 'Medicamento eliminado exitosamente' });
    });
});
*/


// Ruta para eliminar el medicamento y su lote correspondiente
/*
app.delete('/api/deleteMedicamentos/:barCode', (req, res) => {
    const barCode = req.params.barCode;

    
    const queryEliminarLote = `
        DELETE l 
        FROM lotes AS l
        INNER JOIN medicamentos AS m ON l.Id_Medicamento = m.Id_medicamento
        WHERE m.Codigo_barras = ?`;

    db.query(queryEliminarLote, [barCode], (err, result) => {
        if (err) {
            console.error('Error al eliminar el lote:', err);
            return res.status(500).send('Error al eliminar el lote');
        }

        
        const queryEliminarMedicamento = `
            DELETE FROM medicamentos 
            WHERE Codigo_barras = ?`;

        db.query(queryEliminarMedicamento, [barCode], (err, result) => {
            if (err) {
                console.error('Error al eliminar el medicamento:', err);
                return res.status(500).send('Error al eliminar el medicamento');
            }

            // Si la eliminación fue exitosa, envía una respuesta
            res.status(200).send('Medicamento y lote eliminados exitosamente');
        });
    });
});
*/
/*
app.delete('/api/deleteMedicamentos/:barCode', (req, res) => {
    const barCode = req.params.barCode;

    // Primero, elimina el medicamento en la tabla medicamentos
    const queryEliminarMedicamento = `
        DELETE FROM medicamentos 
        WHERE Codigo_barras = ?`;

    db.query(queryEliminarMedicamento, [barCode], (err, result) => {
        if (err) {
            console.error('Error al eliminar el medicamento:', err);
            return res.status(500).send('Error al eliminar el medicamento');
        }

        // Luego, elimina el lote asociado al medicamento
        const queryEliminarLote = `
            DELETE l 
            FROM lotes AS l
            INNER JOIN medicamentos AS m ON l.Id_Medicamento = m.Id_medicamento
            WHERE m.Codigo_barras = ?`;

        db.query(queryEliminarLote, [barCode], (err, result) => {
            if (err) {
                console.error('Error al eliminar el lote:', err);
                return res.status(500).send('Error al eliminar el lote');
            }

            // Si la eliminación fue exitosa, envía una respuesta
            res.status(200).send('Medicamento y lote eliminados exitosamente');
        });
    });
});

*/
//Ruta para buscar los medicamentos por creacion tabla historial_creacion_medicamentos
/*
app.get('/api/getHistorialCreacionMedicamentos', (req, res) => {

    const queryMostrarDatos = `
        SELECT 
            Fecha_creacion,
            Nombre_medicamento,
            Codigo_barras, 
            Fecha_vencimiento,
            Lote_medicamento,
            Creado_por
        FROM historial_creacion_medicamentos
    `;

    db.query(queryMostrarDatos, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            return;
        }
        console.log("Datos obtenidos:", result);  // Verifica aquí
        res.json(result);
    });
});
*/


//Ruta para buscar los medicamentos para el page inventory-report
/*
app.get('/api/getInventoryMedicamentos', (req, res) => {

    const queryMostrarDatos = `
        SELECT 
            m.Codigo_barras, 
            m.Nombre,
            m.Dosis,
            m.Presentacion,
            l.Numero_lote,
            l.Cantidad,
            l.Laboratorio,
            l.Fecha_vencimiento
        FROM medicamentos as m
        INNER JOIN lotes AS l 
        ON m.Id_medicamento = l.Id_medicamento
        ORDER BY l.Fecha_vencimiento ASC
    `;

    db.query(queryMostrarDatos, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            return;
        }
        console.log("Datos obtenidos:", result);  // Verifica aquí
        res.json(result);
    });
});
*/


// Escucha en el puerto especificado
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});
