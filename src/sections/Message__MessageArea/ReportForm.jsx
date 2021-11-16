import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CONTACT_DIR } from "../../config";

import CustomButton from "../../components/UI/CustomButton/CustomButton.component";
import CustomTextarea from "../../components/UI/CustomInput/CustomTextArea.component";

import "./ReportForm.scss";

const ERROR = "error-notification",
	SUCCESS = "success-notification";
let timer;

const ReportForm = ({ uid, messageId, onHide }) => {
	const formRef = useRef();
	const [notifyClass, setNotifyClass] = useState("");
	const formReportSendingHandler = (e) => {
		e.preventDefault();
		const {
			"report-reason": { value: reason },
			"report-content": { value: content },
		} = formRef.current;

		if (!reason || !content) {
			return;
		}

		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		fetch(`https://jsonplaceholder.typicode.com/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: uid,
				message: messageId,
				reason,
				content,
			}),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Invalid report");
				}
				return res.json();
			})
			.then((res) => {
				setNotifyClass(SUCCESS);

				timer = setTimeout(() => {
					onHide();
				}, 3000);
			})
			.catch((err) => {
				setNotifyClass(ERROR);
				console.error(err);
			});
	};

	useEffect(() => {
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	return (
		<form className="report-form" ref={formRef} onSubmit={formReportSendingHandler}>
			<h2 className="report-form__title">Report abuse</h2>
			<p className="report-form__claim">
				Flagged content is reviewed by our staff to determine whether it violates Terms of
				Service or Community Guidelines. If you hane a question or technical issue, please
				contact our{" "}
				<Link className="report-form__link" to={CONTACT_DIR}>
					Support team here
				</Link>
				.
			</p>
			<label className="report-form__label" htmlFor="report-reason">
				Issue type
			</label>
			<div className="report-form__reason">
				<select className="report-form__select" name="report-reason" id="report-reason">
					<option value="" disabled selected hidden>
						Select an issue
					</option>
					<option value="inappropriate-content">Inappropriate Content</option>
					<option value="inappropriate-behavior">Inappropriate Behavior</option>
					<option value="policy-violation">Policy Violation</option>
					<option value="spam">Spammy Content</option>
					<option value="Other">Other</option>
				</select>
			</div>
			<CustomTextarea
				className="report-form__content"
				sendInputValue={() => {}}
				sendInputValidity={() => {}}
				textAreaClassName="report-form__textarea"
				input={{
					id: "report-content",
					label: "Report Content",
					name: "report-content",
					placeholder: "",
				}}
			/>
			<p className={notifyClass}>
				{notifyClass === ""
					? ""
					: notifyClass === ERROR
					? "We can't send your report! Please try it again!"
					: "Your report was sent. We'll close report form automatically."}
			</p>
			<div className="report-form__btns">
				<CustomButton className="report-form__btn" onClick={onHide}>
					Cancel
				</CustomButton>
				<CustomButton type="submit" className="report-form__btn--submit" onClick={() => {}}>
					Submit
				</CustomButton>
			</div>
		</form>
	);
};

export default ReportForm;
