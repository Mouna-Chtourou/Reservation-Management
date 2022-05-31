import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/fr";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import Layout from "../layout";
import "../css.css";
import { showErrMsg } from "../utils/notifications.js";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Datetime from "react-datetime";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  updateReservation,
  listReservations,
  deleteReservation,
  libererReservation,
} from "../../actions/reservationActions";
import { isEmpty } from "../utils/validation";
import Moment from "moment";
import "moment/locale/fr";

function Modifier(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const resetHandler = () => {
    setTitre("");
    setDebut(new Date());
    setFin(new Date());
    setShow(false);
    setRessource([]);
  };

  const {loading,success: successCreate,} = useSelector((state) => state.reservationCreate);
  const reservationUpdate = useSelector((state) => state.reservationUpdate);
  const { success: successUpdate, error } = reservationUpdate;
  const reservationDelete = useSelector((state) => state.reservationDelete);
  const { success: successDelete } = reservationDelete;
  const reservationLiberer = useSelector((state) => state.reservationLiberer);
  const { success: successLiberer } = reservationLiberer;
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
    dispatch(listReservations());
  }, [successUpdate, successDelete, successLiberer]);

  const reservationList = useSelector((state) => state.reservationList);
  const [id, setId] = useState("");
  const [titre, setTitre] = useState("");
  const [debut, setDebut] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const [ressource, setRessource] = useState([]);
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const { reservations } = reservationList;

  const handleChangeSelect = (e) => {
    setRessource(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const [isOpen, setIsOpen] = useState(false);

  const hideModal = () => {
    setIsOpen(false);
    resetHandler();
  };

  const event =
    reservations && reservations.length
      ? reservations.map((res, index) => ({
          title: userInfo && userInfo.email === res.user.email && res.titre,
          start: userInfo && userInfo.email === res.user.email && res.deDate,
          end: userInfo && userInfo.email === res.user.email && res.versDate,
          allday: false,
          user: userInfo && userInfo.email === res.user.email && res.user.email,
          eventid: userInfo && userInfo.email === res.user.email && res._id,
          ressource:
            userInfo &&
            userInfo.email === res.user.email &&
            res.ressource.length !== 0
              ? res.ressource.map((item) => item._id)
              : [],
          Options:
            userInfo &&
            userInfo.email === res.user.email &&
            res.ressource.length !== 0
              ? res.ressource
              : [],
          salle: userInfo && userInfo.email === res.user.email && res.salle,
          color: "#74b358",
        }))
      : null;

  const config = userInfo && {
    headers: { Authorization: `Bearer ${userInfo.token}` },
    params: { debut: debut.toISOString(), fin: fin.toISOString() },
  };

  const { data: ressources } = useQuery(
    `get-availiable-ressources-${debut.toISOString()}-${fin.toISOString()}`,
    () =>
      axios.get("/reservations/disponibilite", config).then((res) =>
        res.data.map(({ _id, items }) => ({
          label: _id,
          options: items.map((item) => ({
            value: item.res_id,
            label: `${item.res} ( ${item.organisme} ) `,
          })),
        }))
      )
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (isEmpty(titre) || isEmpty(debut) || isEmpty(fin)) {
      return setMsg(" Merci de remplir tous les champs.");
    }
    dispatch(updateReservation(id, titre, debut, fin, ressource))
    hideModal();
    Swal.fire("Réservation modifié avec succès", "", "success");
  };

  const libererHandler = (e) => {
    e.preventDefault();
    dispatch(libererReservation(id, new Date()));
    hideModal();
    Swal.fire("Salle est libérée ", "", "success");
  };

 
  return (
    <Layout>
      {userInfo && userInfo.role === "employe" ? (
        <Link to="/reservations/reserver">
          <button type="button" className="btn-cal mb-2 btn btn-fw">
            <i className="mdi mdi-arrow-left mr-2"></i>
            Retourner vers liste des salles
          </button>
        </Link>
      ) : (
        <Link to="/reservations/liste">
          <button type="button" className="btn-cal mb-2 btn btn-fw">
            <i className="mdi mdi-arrow-left mr-2"></i>
            Retourner vers liste réservations
          </button>
        </Link>
      )}
      <div className="center">
        <h2 className=" margin text-center text-secondary">
          Réservations pour cette semaine
        </h2>
        <div className="maincontainer mb-5 size">
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,dayGridMonth",
            }}
            selectable={true}
            eventClick={function (info) {
              setOptions(
                info.event.extendedProps.Options.map((r) => ({
                  label: r.nom + "(" + r.organisme.nom + ")" ,
                  value: r._id,
                }))
              );
              Swal.fire({
                title: "Titre : " + info.event.title,
                html:
                  " Date début :" +
                  Moment(info.event.start).format("DD/MM/YYYY HH:mm") +
                  "h" +
                  "<br>" +
                  " Date fin :" +
                  Moment(info.event.end).format("DD/MM/YYYY HH:mm") +
                  "h" +
                  "<br>" +
                  "Salle : " +
                  info.event.extendedProps.salle.nom +
                  "<br>" +
                  "ressources : " +
                  (info.event.extendedProps.Options &&
                  info.event.extendedProps.ressource.length !== 0
                    ? info.event.extendedProps.Options.map((i) => i.nom)
                    : "<p className='text-dark' style='font-size:18px;'> Pas de ressources réservées <p/>") +
                  "<br>",
                showDenyButton: true,
                showCancelButton: true,
                cancelButtonText: "Fermer",
                cancelButtonColor: "#8140e1",
                confirmButtonText: "Modifier",
                confirmButtonColor: "#FFC107",
                denyButtonText: `Annuler`,
                denyButtonColor: "#FF5252",
              }).then((result) => {
                if (result.isConfirmed) {
                  setIsOpen(true);
                  setDebut(info.event.start);
                  setFin(info.event.end);
                  setTitre(info.event.title);
                  setId(info.event.extendedProps.eventid);                 
                } else if (result.isDenied) {
                  const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "btn btn-success",
                      cancelButton: "btn btn-danger",
                    },
                    buttonsStyling: false,
                  });

                  swalWithBootstrapButtons
                    .fire({
                      title:
                        "Vous êtes sûr que vous voulez annuler la réservation ?",
                      text: "",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Oui !",
                      cancelButtonText: "Non !",
                      reverseButtons: true,
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        dispatch(
                          deleteReservation(info.event.extendedProps.eventid)
                        );
                        swalWithBootstrapButtons.fire(
                          "Annulée avec succès!",
                          "La réservation est annulée avec succès.",
                          "success"
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                          "annulé",
                          "Votre réservatioon est encore valable",
                          "error"
                        );
                      }
                    });
                }
              });
            }}
            events={event}
          />
        </div>
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <h4 className="modal-title align-center">
              Modifier la réservation
            </h4>
          </Modal.Header>
          {msg && showErrMsg(msg)}
          {error && showErrMsg(error)}
          <div className='center-div'>
            <form className="forms-sample" onSubmit={submitHandler}>
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">
                  Titre <span className="required">*</span>
                </label>
                <div className="col-sm-7">
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Ajouter un titre"
                    onChange={(e) => setTitre(e.target.value)}
                    value={titre}
                  />
                </div>
              </Form.Group>
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">
                  Date de début <span className="required">*</span>{" "}
                </label>
                <div className="col-sm-7">
                  <Datetime
                    locale="fr"
                    value={debut}
                    required
                    onChange={(date) => setDebut(date)}
                  />
                </div>
              </Form.Group>
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">
                  Date de fin <span className="required">*</span>
                </label>
                <div className="col-sm-7">
                  <Datetime
                    locale="fr"
                    value={fin}
                    onChange={(date) => setFin(date)}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group className="row ressource-box">
                <label className="col-sm-3 col-form-label">
                  {" "}
                  Ressources de la salle{" "}
                </label>
                <div className="text-left col-sm-7 form-control-multiselect">
                  <Select
                    isMulti
                    defaultValue={options}
                    // placeholder="pas de ressources réservées"
                    onChange={handleChangeSelect}
                    options={ressources || []}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "rgba(49,173,225,0.2)",
                      },
                    })}
                  ></Select>
                </div>
              </Form.Group>
              <div className="text-left">
                <p aria-hidden="true" id="required-description">
                  <span className="required ml-4">*</span> Champ obligatoire
                </p>
              </div>
              <div className="row">
                <div className="col-7"></div>
                <button
                  type="submit"
                  className=" btn btn-res btn-primary mt-2 ml-2 "
                  onClick={libererHandler}
                >
                  Libérer
                </button>
                <button
                  type="submit"
                  className=" btn btn-res btn-primary mt-2 ml-2"
                >
                  Modifier
                </button>
                <button
                  type="reset"
                  className="btn btn-res btn-light mt-2 ml-2"
                  onClick={hideModal}
                >
                  Fermer
                </button>
              </div>
            </form>
</div>
        </Modal>
      </div>
    </Layout>
  );
}

export default Modifier;
