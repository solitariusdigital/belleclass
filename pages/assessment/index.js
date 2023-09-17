import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./assessment.module.scss";
import Progress from "@/components/Progress";
import avatar from "@/assets/doctorAvatar.png";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import secureLocalStorage from "react-secure-storage";
import {
  createRecordApi,
  getUsersApi,
  createUserApi,
  updateUserApi,
} from "@/services/api";

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
  const [disableButton, setDisableButton] = useState(false);

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
    setDisableButton(true);
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

    // to save user name into db
    if (currentUser) {
      const user = {
        _id: currentUser["_id"],
        name: name,
        phone: phone.trim(),
        permission: currentUser.permission,
      };
      await updateUserApi(user);
    }
    window.location.assign("/portal");
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
      }
      setCurrentUser(userData);
      secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
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
          priority
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
        {!currentUser && (
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
            <p>ارسال عکس اختیاری به پزشک بل کلاس</p>
          </label>
          {image !== "" && (
            <div className={classes.imagePreview}>
              <CloseIcon
                className="icon"
                onClick={() => setImage("")}
                sx={{ fontSize: 16 }}
              />
              <Image
                className={classes.image}
                width={170}
                height={200}
                objectFit="contain"
                src={URL.createObjectURL(image)}
                alt="image"
                priority
              />
            </div>
          )}
        </div>
        {!currentUser && (
          <p className="message">
            با ثبت درخواست مشاوره حساب پرتال شما ساخته میشود
          </p>
        )}
        {alert && <p className="alert">{alert}</p>}
        <button
          className={classes.button}
          disabled={disableButton}
          onClick={() => createRecord()}
        >
          ثبت
        </button>
      </div>
    </div>
  );
}
