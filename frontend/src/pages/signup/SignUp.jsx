// STARTER CODE FOR THE SIGNUP COMPONENT
import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs,setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: ""
	});

	const {loading,signup}= useSignup();

	const handleSumbit = async (event) =>{
		event.preventDefault();
		await signup(inputs);
	}

	const handleCheckboxChange = (gender) =>{
		setInputs({...inputs,gender});
	}

	const handleInputs = (event) =>{
		const newName = event.target.name;
		const newValue = event.target.value;
		setInputs((curr)=>{
			return{
				...curr,
				[newName] : newValue
			}
		});
	}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSumbit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered h-10' name="fullName" value={inputs.fullName} onChange={handleInputs}/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' name="username" value={inputs.username} onChange={handleInputs}/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							name="password"
							value={inputs.password}
							onChange={handleInputs}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							name="confirmPassword"
							value={inputs.confirmPassword}
							onChange={handleInputs}
						/>
					</div>

					<GenderCheckbox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

					<Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
