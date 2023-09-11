import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Register.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { createDoctorApi, createUserApi } from "@/services/api";
import Image from "next/legacy/image";
import Router from "next/router";

export default function Form() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [alert, setAlert] = useState("");

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const transformTags = (value) => {
    return value.split(" ");
  };

  const handleSubmit = async () => {
    console.log(transformTags(tags));
    if (!name || !title || !bio || !tags || !phone) {
      showAlert("همه موارد الزامیست");
      return;
    }
    if (phone.length !== 11 || !phone.startsWith("09")) {
      showAlert("موبایل اشتباه");
      return;
    }

    const user = {
      name: name,
      phone: phone.trim(),
      permission: "doctor",
    };
    const userData = await createUserApi(user);

    const doctor = {
      name: name,
      title: title,
      bio: bio,
      userId: userData["_id"],
      tags: transformTags(tags),
    };
    await createDoctorApi(doctor);
    window.location.assign("/doctors");
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>پزشک جدید</p>
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
          placeholder="دکتر ..."
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
          placeholder="متخصص زیبایی"
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
        <div className={classes.bar}>
          <p className={classes.label}>
            تگ
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setTags("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          placeholder="پوست مو تزریق"
          type="text"
          id="tags"
          name="tags"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
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
          id="bio"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
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
          <p>عکس اختیاری</p>
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
      <div className={classes.formAction}>
        <p className="alert">{alert}</p>
        <button onClick={() => handleSubmit()}>ذخیره</button>
      </div>
    </div>
  );
}
