import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./assessment.module.scss";
import Progress from "@/components/Progress";
import avatar from "@/assets/doctorAvatar.png";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import { createRecordApi, getUsersApi, createUserApi } from "@/services/api";
import secureLocalStorage from "react-secure-storage";
import Router from "next/router";

export default function Assessment() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);

  const [progressCompleted, setProgressCompleted] = useState(80);
  const [name, setName] = useState(currentUser ? currentUser.name : "");
  const [phone, setPhone] = useState(currentUser ? currentUser.phone : "");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    navigationTopBar.map((nav, i) => {
      nav.active = false;
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createRecord = async () => {
    if (phone.length !== 11 || !phone.startsWith("09")) {
      showAlert("موبایل اشتباه");
      return;
    }
    if (!name || !phone) {
      showAlert("نام و موبایل الزامیست");
      return;
    }
    if (!title || !comment) {
      showAlert("عنوان و توضیحات الزامیست");
      return;
    }
    let userId = await setUserId();
    // create a new record object
    let record = {
      title: title,
      userId: userId,
      doctorId: "",
      comments: [comment],
      image: "",
      example: "",
      completed: false,
    };
    await createRecordApi(record);
    Router.push("/portal");
  };

  const setUserId = async () => {
    if (!currentUser) {
      let userData = null;
      const users = await getUsersApi();
      userData = users.find((user) => user.phone === phone);
      if (!userData) {
        const user = {
          name: name,
          phone: phone.trim(),
          permission: "patient",
        };
        userData = await createUserApi(user);
        setCurrentUser(userData);
        secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
      }
      return userData["_id"];
    } else {
      return currentUser["_id"];
    }
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Image
          className={classes.image}
          src={avatar}
          placeholder="blur"
          alt="image"
          width={150}
          height={150}
          objectFit="cover"
          loading="eager"
        />
        <div>
          <h2>پزشک بل کلاس</h2>
          <p>مشاوره رایگان</p>
        </div>
      </div>
      <div className={classes.progress}>
        <Progress color={"#e7c69a"} completed={progressCompleted} />
        <button
          disabled={progressCompleted === 0}
          onClick={() => setProgressCompleted(progressCompleted - 20)}
        >
          back
        </button>
        <button
          disabled={progressCompleted === 100}
          onClick={() => setProgressCompleted(progressCompleted + 20)}
        >
          next
        </button>
      </div>
      <div className={classes.form}>
        {!currentUser ? (
          <Fragment>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  نام
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() => setName("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoComplete="off"
                dir="rtl"
              />
            </div>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  موبایل
                  <span>*</span>
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() => setPhone("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                autoComplete="off"
                dir="rtl"
              />
            </div>
          </Fragment>
        ) : (
          <div className={classes.details}>
            <p>{phone}</p>
            <p>{name}</p>
          </div>
        )}
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              عنوان
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setTitle("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="فیلر صورت"
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoComplete="off"
            dir="rtl"
          />
        </div>
        <div className={classes.input}>
          <p className={classes.label}>
            توضیحات
            <span>*</span>
          </p>
          <textarea
            placeholder="..."
            type="text"
            id="comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            autoComplete="off"
            dir="rtl"
          ></textarea>
        </div>
        <div className={classes.input}>
          <label className={classes.file}>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              accept="image/png, image/jpeg"
            />
            <p>انتخاب عکس اختیاری</p>
          </label>

          {image !== "" && (
            <Image
              className={classes.image}
              width={50}
              height={200}
              objectFit="cover"
              src={URL.createObjectURL(image)}
              alt="image"
            />
          )}
        </div>
        {alert && <p className="alert">{alert}</p>}
        <button className={classes.button} onClick={() => createRecord()}>
          ثبت
        </button>
      </div>
    </div>
  );
}
