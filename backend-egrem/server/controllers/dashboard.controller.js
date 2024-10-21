const {pool} = require('../config/db');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const zlib = require('zlib');
const { exec } = require('child_process');

const listar= async (req, res) => {
    const text = `SELECT * FROM postulantes`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const listarDeptos= async (req, res) => {
    const text = `select id_depto, departamento from departamentos`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const listarCentros= async (req, res) => {
    const text = `select id_centro, nombre from centros_medicos where tipo = '${req.params.tipo}'`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const listarEscuelas = async (req, res) => {
    const text = `select id_escuela, nombre from escuelas`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const datoEmpresa= async (req, res) => {
    const text = `select 
    case when id_directorio is null then id_usuario else id_directorio end as id_directorio,
    case when razon_social is null then su.nombre else razon_social end as razon_social, 
    case when ed.nit is null then su.nit else ed.nit end as nit, 
    rotulo_comercial, 
    case when ed.departamento is null then su.departamento else ed.departamento end as departamento, 
    ciudad, 
    case when ed.zona is null then su.zona else ed.zona end as zona, 
    case when ed.calle is null then su.calle else ed.calle end as calle,  
    case when ed.numero is null then su.numero else ed.numero end as numero,   
    entre_calles, edificio, piso, numero_oficina, 
    case when ed.telefono is null then su.telefono else ed.telefono end as telefono,   
    fax, email, pagina, actividad_principal, tipo_sector, otro from seg_usuario su 
    left join enc_directorio ed on su.login = ed.nit::text
    where su.login ='${req.params.codigo}'`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const datoGastos = async (req, res) => {
    const text = `select * from enc_registro where id_directorio=${req.params.id} and gestion=${req.params.gestion}`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const listaDirectorio = async (req, res) => {
    const text = `select 
    case when ed.id_directorio is null then id_usuario else ed.id_directorio end as id_directorio, 
        case when razon_social is null then su.nombre else razon_social end as razon_social, 
        case when ed.nit is null then su.nit else ed.nit end as nit,
        er.informante,er.cargo,
        case when er.estado is null then 'INICIAL' else er.estado end as estado
    from seg_usuario su 
    left join enc_directorio ed on ed.id_directorio=su.id_usuario
    left join enc_registro er on er.id_directorio=su.id_usuario and gestion=${req.params.gestion}
    where id_rol=1 order by estado`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            return res.status(200).json(result.rows);
        }
    })
}

const updateEmpresa = async (req, res) => {
    let text;
    let text1;
    text = `select count(*) from enc_directorio where nit='${req.body.nit}'`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            if (result.rows[0].count==0 ) {
                text1 = `INSERT INTO public.enc_directorio(id_directorio,razon_social, nit, rotulo_comercial, departamento, ciudad, zona, calle, numero, entre_calles, edificio, piso, 
                    numero_oficina, telefono, fax, email, pagina, actividad_principal, tipo_sector, otro, usucre)
                    VALUES (${req.body.id_directorio},'${req.body.razon_social}','${req.body.nit}','${req.body.rotulo_comercial}','${req.body.departamento}','${req.body.ciudad}','${req.body.zona}',
                    '${req.body.calle}','${req.body.numero}','${req.body.entre_calles}','${req.body.edificio}','${req.body.piso}','${req.body.numero_oficina}','${req.body.telefono}',
                    '${req.body.fax}','${req.body.email}','${req.body.pagina}','${req.body.actividad_principal}','${JSON.stringify(req.body.tipo_sector)}','${req.body.otro}','${req.body.login}') returning *`;
                console.log(text1)
                pool.query(text1, async (err, result1) => {
                    if (err) { throw err; } else {
                        return res.status(200).json(result1.rows);
                    }
                })
            } else {
                text1 = `UPDATE public.enc_directorio SET  
                    rotulo_comercial='${req.body.rotulo_comercial}', 
                    departamento='${req.body.departamento}', 
                    ciudad='${req.body.ciudad}', 
                    zona='${req.body.zona}', 
                    calle='${req.body.calle}', 
                    numero='${req.body.numero}', 
                    entre_calles='${req.body.entre_calles}', 
                    edificio='${req.body.edificio}', 
                    piso='${req.body.piso}', 
                    numero_oficina='${req.body.numero_oficina}', 
                    telefono='${req.body.telefono}', 
                    fax='${req.body.fax}', 
                    email='${req.body.email}', 
                    pagina='${req.body.pagina}', 
                    actividad_principal='${req.body.actividad_principal}', 
                    tipo_sector='${JSON.stringify(req.body.tipo_sector)}', 
                    otro='${req.body.otro}', 
                    usumod='${req.body.login}', 
                    fecmod=now()
                WHERE nit='${req.body.nit}' returning *`;
                pool.query(text1, async (err, result1) => {
                    if (err) { throw err; } else {
                        return res.status(200).json(result1.rows);
                    }
                })
            }
        } 
    })
}


const updateGastos = async (req, res) => {
    let text;
    let text1;
    text = `select count(*) from enc_registro where id_directorio=${req.body.id_directorio} and gestion=${req.body.gestion} and estado='ELABORADO'`;
    pool.query(text, async (err, result) => {
        if (err) { throw err; } else {
            if (result.rows[0].count==0 ) {
                text1 = `INSERT INTO public.enc_registro(id_directorio, informante, cargo, gestion, datos, estado, usucre, feccre)
                VALUES (${req.body.id_directorio},'${req.body.informante}','${req.body.cargo}',${req.body.gestion},'${JSON.stringify(req.body.datos)}','${req.body.estado}','${req.body.usuario}',NOW()) returning *`;
                pool.query(text1, async (err, result1) => {
                    if (err) { throw err; } else {
                        return res.status(200).json(result1.rows);
                    }
                })
            } else {
                text1 = `UPDATE public.enc_registro SET 
                informante='${req.body.informante}', 
                cargo='${req.body.cargo}', 
                datos='${JSON.stringify(req.body.datos)}', 
                estado='${req.body.estado}', 
                usumod='${req.body.usuario}', 
                fecmod=now()
                WHERE id_directorio=${req.body.id_directorio} and gestion=${req.body.gestion}
                returning *`;
                pool.query(text1, async (err, result1) => {
                    if (err) { throw err; } else {
                        return res.status(200).json(result1.rows);
                    }
                })
            }
        }
    })
}

module.exports = {
    listar,
    listarDeptos,
    datoEmpresa,
    datoGastos,
    listaDirectorio,
    updateEmpresa,
    updateGastos,
}


