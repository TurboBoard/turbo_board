import { useEffect, useState } from "react";

import { debounce } from "lodash";

import Input from "@Components/inputs/Input";
import Upload from "@Svgs/Upload";

type State = {
	image_id: string | null;
	name: string;
};

const get_user_image = async (set_state: Function) => {
	const response = await fetch(`/api/user_data/get_image`);

	const json = await response.json();

	if (!json.user) return;

	const { image_id, name } = json.user;

	set_state({
		image_id,
		name,
	});
};

const update_user_image = async (form_data: any) => {
	const response = await fetch(`/api/user_data/update_image`, {
		method: "POST",
		body: form_data,
	});

	const json = await response.json();

	return json.new_image_id;
};

const update_user_name = debounce(
	async (new_user_name: string) =>
		await fetch(`/api/user_data/update_name`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ new_user_name }),
		}),
	500
);

const Form = ({ email }: { email: string | null }) => {
	const [state, set_state] = useState<State | null>(null);

	useEffect(() => {
		get_user_image(set_state);
	}, []);

	if (!state) return null;

	const update_image = async (file: any) => {
		if (!state.image_id) return;

		let form_data = new FormData();

		form_data.append("image", file);
		form_data.append("old_image_id", state.image_id);

		set_state({
			...state,
			image_id: null,
		});

		const new_image_id = await update_user_image(form_data);

		if (!new_image_id) return;

		set_state({
			...state,
			image_id: new_image_id,
		});
	};

	const update_name = (new_user_name: string) => {
		set_state({
			...state,
			name: new_user_name,
		});

		if (!new_user_name.length) return;

		update_user_name(new_user_name);
	};

	return (
		<form className="md:flex md:space-x-10" onSubmit={(e) => e.preventDefault()}>
			<fieldset className="md:flex-1">
				<legend>User</legend>

				<div className="space-y-5">
					<Input
						handle_change={(value: string) => update_name(value)}
						id="user_name"
						label="Name"
						placeholder="Ryu"
						required={true}
						type="text"
						value={state.name}
					/>

					{email && (
						<Input disabled={true} handle_change={() => null} id="email" label="Email" placeholder="" required={true} type="email" value={email} />
					)}
				</div>
			</fieldset>

			<fieldset className="flex items-center justify-center user-image">
				<legend>Image</legend>

				<div className="relative h-36 w-36 overflow-hidden rounded-full">
					{state.image_id ? (
						<img className="h-full w-full" alt={state.name} src={`https://images.turboboard.io/${state.image_id}.jpg`} />
					) : (
						<div className="h-full w-full bg-primary animate-pulse" />
					)}

					<div className="absolute inset-0 flex items-center justify-center h-full w-full bg-primary text-light opacity-0 in-out-smooth user-image__icon">
						<div className="h-16">
							<Upload />
						</div>
					</div>
				</div>

				<label className="hidden" htmlFor="image">
					Update User Image
				</label>

				<input
					accept="image/png, image/jpeg"
					className="absolute inset-0 opacity-0 cursor-pointer"
					id="image"
					onInputCapture={(e: any) => update_image(e.target.files[0])}
					type="file"
				/>
			</fieldset>
		</form>
	);
};

export default Form;
