import express from 'express';
import db from './db-connection.js';
import 'dotenv/config';
import cors from 'cors';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hola pagina principal");    
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});


(async function () {
    let adminIdCard = "admin";
    let adminFullName = "Yeily Ortiz Angarita";
    let adminEmail = "yeilyortiz25@gmail.com";
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

//crear medicamento yeily

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




//final de crear medicamento yeily

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

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});