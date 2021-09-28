import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import UpdateForm from "./UpdateForm";
import Modal from "../../components/UI/Modal/Modal";
import ErrorNotification from "../../components/Layout/ErrorNotification";
import SuccessNotification from "../../components/Layout/SuccessNotification";
import CustomInput from "../../components/UI/CustomInput/CustomInput.component";
import CustomButton from "../../components/UI/CustomButton/CustomButton.component";

import URLValidator from "../../Helpers/URLValidator.js";
import phoneValidator from "../../Helpers/phoneValidator.js";

import { DB_URL, DEFAULT_COVER_IMG, PUBLIC_USR } from "../../config";
import sendDataToURL from "../../Helpers/sendDataToURL";
import "./PrivateDashboard.scss";

const PrivateDashboard = () => {
	const formRef = useRef();
	const [coverImg, setCoverImg] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [userProfile, setUserProfile] = useState();
	const [errorContent, setErrorContent] = useState("");
	const [successContent, setSuccessContent] = useState("");
	const [activeCoverImgs, setActiveCoverImgs] = useState("");
	const [showChangeCoverImg, setShowChangeCoverImg] = useState(false);
	const [showProfileChangeInput, setShowProfileChangeInput] = useState(false);
	const userData = useSelector((store) => store.user);
	const uid = userData.auth.localId;

	useEffect(() => {
		fetch(`${DB_URL}profile/${uid}.json`)
			.then((response) => response.json())
			.then((data) => {
				if (!data) {
					setUserProfile(null);
					return;
				}
				const userData = Object.values(data)[0];
				setUserProfile(userData);
			});
	}, []);

	useEffect(() => {
		if (!userProfile) {
			setCoverImg(DEFAULT_COVER_IMG);
			return;
		}
		setCoverImg(userProfile.coverImgs || DEFAULT_COVER_IMG);
	}, [userProfile]);

	useEffect(() => {
		const userImg = `https://robohash.org/${uid}?set=set4&bgset=bg1`;
		if (!userProfile) {
			setProfileImg(userImg);
			return;
		}
		setProfileImg(userProfile.profileImgs || userImg);
	}, [userProfile]);

	const showCoverImgChangeInputHandler = () => {
		setShowChangeCoverImg(true);
	};
	const hideCoverImgChangeInputHandler = (e) => {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT") {
			return;
		}

		setShowChangeCoverImg(false);
		setActiveCoverImgs("");

		const coverUrlInput = formRef.current["cover-image"];
		const coverUrl = coverUrlInput.value;
		if (URLValidator(coverUrl)) {
			setCoverImg(coverUrl);
		}
	};
	const coverImgMouseEnterHandler = () => {
		setActiveCoverImgs("private-dashboard__user-cover-img--active");
	};

	const showProfileChangeURLInput = () => {
		setShowProfileChangeInput(true);
	};
	const hideProfileChangeURLInput = (e) => {
		const targetElement = e.target;
		if (targetElement.tagName === "INPUT") {
			return;
		}

		setShowProfileChangeInput(false);

		const profileUrlInput = formRef.current["profile-image"];
		const profileUrl = profileUrlInput.value;
		if (URLValidator(profileUrl)) {
			setProfileImg(profileUrl);
		}
	};
	const showErrorHandler = (errorMessage) => {
		setErrorContent(errorMessage);
	};
	const hideErrorHandler = () => {
		setErrorContent("");
	};
	const showSuccessMessage = (successMessage) => {
		setSuccessContent(successMessage);
	};
	const hideSuccessMessage = () => {
		setSuccessContent("");
	};
	const formSubmitHandler = (e) => {
		e.preventDefault();
		if (e.target.type !== "submit") {
			return;
		}
		const submitObj = {};
		const specProps = {
			"profile-image": URLValidator,
			"cover-image": URLValidator,
			phone: phoneValidator,
		};
		const errorProps = [];

		for (const element of formRef.current) {
			if (element.tagName !== "INPUT") {
				continue;
			}

			if (!element.value) {
				continue;
			}

			if (element.type === "radio" && !element.checked) {
				continue;
			}

			submitObj[element.name] = element.value || submitObj[element.name];
		}

		for (const [prop, value] of Object.entries(submitObj)) {
			if (prop in specProps) {
				specProps[prop] = specProps[prop](value);
			} else if (value.trim() === "") {
				delete submitObj[prop];
			}
		}

		for (const [prop, value] of Object.entries(specProps)) {
			if (prop in submitObj) {
				!value && errorProps.push(prop);
			}
		}

		if (errorProps.length > 0) {
			const message = `Your ${errorProps
				.join(", ")
				.replaceAll("-", " ")} is invalid! Please check it again!`;
			showErrorHandler(message);

			return;
		}

		const newUserInfo = { ...userData, ...submitObj };

		let { "profile-image": profileImgs, "cover-image": coverImgs, username } = newUserInfo;
		profileImgs = profileImgs || profileImg;
		coverImgs = coverImgs || coverImg;

		const userProfileObj = { ...userProfile, profileImgs, coverImgs, username, id: uid };
		delete newUserInfo.auth;
		delete newUserInfo["profile-image"];
		delete newUserInfo["cover-image"];

		(async () => {
			// Update user's profile
			try {
				await fetch(`${DB_URL}profile/${uid}.json`, {
					method: "DELETE",
				});

				await sendDataToURL(`${DB_URL}profile/${uid}.json`, userProfileObj);
			} catch (error) {
				console.error(error);
				setErrorContent('Something went wrong! Please try again! :"((');
				return;
			}

			// Update user's info
			try {
				await fetch(`${DB_URL}users/${uid}.json`, {
					method: "DELETE",
				});
				await sendDataToURL(`${DB_URL}users/${uid}.json`, newUserInfo);
			} catch (error) {
				console.error(error);
				setErrorContent('Something went wrong! Please try again! :"((');
				return;
			}

			showSuccessMessage("Update your information successfully!");
		})();
	};

	return (
		<section className="private-dashboard">
			{errorContent !== "" && (
				<Modal onHide={hideErrorHandler}>
					<ErrorNotification
						btnContent="Close"
						className="private-dashboard__error-message"
						onHide={hideErrorHandler}
					>
						{errorContent}
					</ErrorNotification>
				</Modal>
			)}

			{successContent !== "" && (
				<Modal onHide={hideSuccessMessage}>
					<SuccessNotification className="private-dashboard__success-message">
						{successContent}
					</SuccessNotification>
				</Modal>
			)}

			<h1 className="private-dashboard__title">Update your infomation</h1>
			<form className="private-dashboard__form" onClick={formSubmitHandler} ref={formRef}>
				<div
					className="private-dashboard__section-2"
					onMouseLeave={hideProfileChangeURLInput}
				>
					<h4 className="private-dashboard__section-title">Profile image:</h4>
					<div
						className="private-dashboard__user-profile-img"
						style={{
							backgroundImage: `url(${profileImg})`,
							backgroundColor: `${profileImg === "" ? "#ccc" : ""}`,
						}}
					>
						<div className="private-dashboard__modal">
							<CustomButton
								className="private-dashboard__profile-image-change-trigger"
								onClick={showProfileChangeURLInput}
								key="profile-image"
							>
								Change Image
							</CustomButton>
						</div>
					</div>

					<div
						className="private-dashboard__input-field private-dashboard__input--profile-img"
						style={{
							display: showProfileChangeInput ? "block" : "none",
						}}
					>
						<CustomInput
							className="private-dashboard__input"
							input={{
								id: "private-dashboard-input-profile-img",
								label: "URL",
								type: "text",
								name: "profile-image",
								placeholder: "Type your image's url here",
							}}
							sendInputValidity={() => {}}
							sendInputValue={() => {}}
						/>
					</div>
				</div>
				<div className="private-dashboard__section-8">
					<h4 className="private-dashboard__section-title">Cover image:</h4>
					<div
						className={`private-dashboard__user-cover-img ${activeCoverImgs}`}
						style={{
							backgroundImage: `url(${coverImg})`,
							backgroundColor: `${coverImg === "" ? "#ccc" : ""}`,
						}}
						onMouseLeave={hideCoverImgChangeInputHandler}
						onMouseEnter={coverImgMouseEnterHandler}
					>
						<div className="private-dashboard__modal">
							{!showChangeCoverImg && (
								<CustomButton
									className="private-dashboard__cover-image-change-trigger"
									onClick={showCoverImgChangeInputHandler}
									key="cover-image"
								>
									Change Image
								</CustomButton>
							)}
							<div
								className="private-dashboard__input-field private-dashboard__input--cover-img"
								style={{
									display: showChangeCoverImg ? "block" : "none",
								}}
							>
								<CustomInput
									className="private-dashboard__input"
									input={{
										id: "private-dashboard-input-cover-img",
										label: "URL",
										type: "text",
										name: "cover-image",
										placeholder: "Type your image's url here",
									}}
									sendInputValidity={() => {}}
									sendInputValue={() => {}}
								/>
							</div>
						</div>
					</div>
					<UpdateForm
						className="private-dashboard__update-area"
						userData={userData}
						baseClass="private-dashboard"
					/>
				</div>
				<div>
					<CustomButton
						className="private-dashboard__form-submit-btn"
						type="submit"
						key="submit-button"
					>
						Update
					</CustomButton>
					<Link
						className="private-dashboard__profile-redirection"
						to={`${PUBLIC_USR}/${uid}`}
					>
						Go to my profile
					</Link>
				</div>
			</form>
		</section>
	);
};

export default PrivateDashboard;
