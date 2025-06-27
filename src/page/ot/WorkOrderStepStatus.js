import React, {useState} from 'react';
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import car from "../../assets/logo/png-clipart-car-wiring-diagram-car-parts-compact-car-sedan.png";

export const WorkOrderStepStatus = ({setMenu}) => {

    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)
    const [check6, setCheck6] = useState(false)
    const [check7, setCheck7] = useState(false)
    const [check8, setCheck8] = useState(false)
    const [check9, setCheck9] = useState(false)
    const [check10, setCheck10] = useState(false)
    const [check11, setCheck11] = useState(false)
    const [check12, setCheck12] = useState(false)


    const [checki1, setChecki1] = useState(false)
    const [checki2, setChecki2] = useState(false)
    const [checki3, setChecki3] = useState(false)
    const [checki4, setChecki4] = useState(false)
    const [checki5, setChecki5] = useState(false)
    const [checki6, setChecki6] = useState(false)
    const [checki7, setChecki7] = useState(false)
    const [checki8, setChecki8] = useState(false)
    const [checki9, setChecki9] = useState(false)
    const [checki10, setChecki10] = useState(false)
    const [checki11, setChecki11] = useState(false)
    const [checki12, setChecki12] = useState(false)



    return (
            <div className="surface-card p-5 shadow-2 border-round flex-auto">
                <div className="text-900 font-semibold text-lg mt-3">Estado general del vehículo</div>
                <Divider></Divider>
                <div className="flex gap-5 flex-column-reverse md:flex-row">
                    <div className="flex-auto p-fluid">
                        <div className="col-12 lg:col-12">
                            <div className="grid">
                                <div className="col-12 lg:col-12" >
                                    <img src={car} alt="Image" style={{ height: '300px', top: '-2rem', right: '-1rem' }} />
                                </div>
                                <div className="col-12 lg:col-6" >
                                    <h3>Exteriores</h3>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="lucesFrontales" name="lucesFrontales" value="Luces Frontales"  onChange={e => setCheck1(e.checked)} checked={check1} />
                                        <label htmlFor="lucesFrontales">Luces Frontales</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="14luces" name="14luces" value="1/4 Luces" onChange={e => setCheck2(e.checked)} checked={check2} />
                                        <label htmlFor="14luces">1/4 Luces</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="antena" name="antena" value="Antena" onChange={e => setCheck3(e.checked)} checked={check3}   />
                                        <label htmlFor="antena">Antena</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="espejosLaterales" name="espejosLaterales" value="Espejos laterales" onChange={e => setCheck4(e.checked)} checked={check4} />
                                        <label htmlFor="espejosLaterales">Espejos laterales</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="cristales" name="cristales" value="Cristales" onChange={e => setCheck5(e.checked)} checked={check5}  />
                                        <label htmlFor="cristales">Cristales</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="emblemas" name="emblemas" value="Emblemas" onChange={e => setCheck6(e.checked)} checked={check6}  />
                                        <label htmlFor="emblemas">Emblemas</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="llantas" name="llantas" value="Llantas"  onChange={e => setCheck7(e.checked)} checked={check7}  />
                                        <label htmlFor="llantas">Llantas</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="taponRuedas" name="taponRuedas" value="Tapon de ruedas" onChange={e => setCheck8(e.checked)} checked={check8}  />
                                        <label htmlFor="taponRuedas">Tapon de ruedas</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="moldurasCompletas" name="moldurasCompletas" value="Moldura completas" onChange={e => setCheck9(e.checked)} checked={check9}  />
                                        <label htmlFor="moldurasCompletas">Moldura completas</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="taponGasolina" name="taponGasolina" value="Tapon de gasolina" onChange={e => setCheck10(e.checked)} checked={check10}  />
                                        <label htmlFor="taponGasolina">Tapon de gasolina</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="limpiadores" name="limpiadores" value="Limpiadores" onChange={e => setCheck11(e.checked)} checked={check11} />
                                        <label htmlFor="limpiadores">Limpiadores</label>
                                    </div>


                                </div>
                                <div className="col-12 lg:col-6" >
                                    <h3>Interiores</h3>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="instrumentosTablero" name="instrumentosTablero" value="Instrumetos tablero" onChange={e => setCheck12(e.checked)} checked={check12} />
                                        <label htmlFor="instrumentosTablero">Instrumetos tablero</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="calefaccion" name="calefaccion" value="CAlefaccion"  onChange={e => setChecki1(e.checked)} checked={checki1} />
                                        <label htmlFor="calefaccion">Calefaccion</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="sistemaSonido" name="sistemaSonido" value="Sistema Sonido" onChange={e => setChecki2(e.checked)} checked={checki2} />
                                        <label htmlFor="sistemaSonido">Sistema Sonido</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="bocinas" name="bocinas" value="Bocinas" onChange={e => setChecki3(e.checked)} checked={checki3}   />
                                        <label htmlFor="bocinas">Bocinas</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="espejoretrovisor" name="espejoretrovisor" value="Espejo Retrovisor" onChange={e => setChecki4(e.checked)} checked={checki4} />
                                        <label htmlFor="espejoretrovisor">Espejo Retrovisor</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="cinturones" name="cinturones" value="Cinturones" onChange={e => setChecki5(e.checked)} checked={checki5}  />
                                        <label htmlFor="cinturones">Cinturones</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="botoneriagral" name="botoneriagral" value="Botonería General" onChange={e => setChecki6(e.checked)} checked={checki6}  />
                                        <label htmlFor="botoneriagral">Botonería General</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="manijas" name="manijas" value="Manijas"  onChange={e => setChecki7(e.checked)} checked={checki7}  />
                                        <label htmlFor="manijas">Manijas</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="tapetes" name="tapetes" value="Tapetes" onChange={e => setChecki8(e.checked)} checked={checki8}  />
                                        <label htmlFor="tapetes">Tapetes</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="vestiduras" name="vestiduras" value="Vestiduras" onChange={e => setChecki9(e.checked)} checked={checki9}  />
                                        <label htmlFor="vestiduras">Vestiduras</label>
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox inputId="otros" name="otros" value="Otros" onChange={e => setChecki10(e.checked)} checked={checki10}  />
                                        <label htmlFor="otros">Otros</label>
                                    </div>

                                </div>
                            </div>
                        <div>
                            <Button label="Continuar" className="p-ripple w-auto back" onClick={()=>setMenu("mainProblem")}/>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
    );

}
