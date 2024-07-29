
import React, { useState } from 'react';
import { db, storage } from '../firebase/index';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Form.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';


const Form = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        skills: '',
        yearsOfExp: '',
        mobile: '',
        email: '',
        noticePeriod: '',
        currentCTC: '',
        expectedCTC: '',
        resume: null,
    });
    const [storeResum, setStoreResum] = useState(null)
    const resume = formData.resume
    console.log("formData", resume);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
        if (!formData.skills) tempErrors.skills = 'Skills are required';
        if (!formData.yearsOfExp) tempErrors.yearsOfExp = 'Years of Experience is required';
        if (!formData.mobile) tempErrors.mobile = 'Mobile number is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!formData.noticePeriod) tempErrors.noticePeriod = 'Notice Period is required';
        if (!formData.currentCTC) tempErrors.currentCTC = 'Current CTC is required';
        if (!formData.expectedCTC) tempErrors.expectedCTC = 'Expected CTC is required';
        if (!formData.resume) tempErrors.resume = 'Resume is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                let fileUrl = '';
                if (formData.resume) {
                    const fileRef = ref(storage, `resumes/${formData.resume.name}`);
                    await uploadBytes(fileRef, formData.resume);
                    fileUrl = await new Promise((resolve) => {
                        setTimeout(async () => {
                            const url = await getDownloadURL(fileRef);
                            resolve(url);
                        }, 2000); // 1 second delay
                    });
                    formData.resume = fileUrl;
                    setStoreResum(fileUrl);
                }
                await addDoc(collection(db, 'applicants'), formData);
                alert('Data saved successfully!');
                navigate('/table');
                setFormData({
                    fullName: '',
                    skills: '',
                    yearsOfExp: '',
                    mobile: '',
                    email: '',
                    noticePeriod: '',
                    currentCTC: '',
                    expectedCTC: '',
                    resume: null,
                });
            } catch (error) {
                console.error('Error adding document: ', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };


    return (
        <div>
            <h1 className="title">Job Application Form</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <label className="form-label">
                        Full Name:
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                    </label>
                    <label className="form-label">
                        Skills:
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="form-input" />
                        {errors.skills && <span className="error">{errors.skills}</span>}
                    </label>
                    <label className="form-label">
                        Years of Experience:
                        <input type="text" name="yearsOfExp" value={formData.yearsOfExp} onChange={handleChange} className="form-input" />
                        {errors.yearsOfExp && <span className="error">{errors.yearsOfExp}</span>}
                    </label>
                    <label className="form-label">
                        Mobile:
                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-input" />
                        {errors.mobile && <span className="error">{errors.mobile}</span>}
                    </label>
                    <label className="form-label">
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </label>
                    <label className="form-label">
                        Notice Period:
                        <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="form-input" />
                        {errors.noticePeriod && <span className="error">{errors.noticePeriod}</span>}
                    </label>
                    <label className="form-label">
                        Current CTC:
                        <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleChange} className="form-input" />
                        {errors.currentCTC && <span className="error">{errors.currentCTC}</span>}
                    </label>
                    <label className="form-label">
                        Expected CTC:
                        <input type="text" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} className="form-input" />
                        {errors.expectedCTC && <span className="error">{errors.expectedCTC}</span>}
                    </label>
                    <label className="form-label">
                        Resume:
                        <input type="file" name="resume" onChange={handleFileChange} className="form-input" />
                        {errors.resume && <span className="error">{errors.resume}</span>}
                    </label>
                    <button type="submit" className="form-button" disabled={isSubmitting}>Submit</button>
                </form>
                <div className='view_btn'>

                <Link to='/table'>View All Data</Link>
                </div>
             
            </div>
        </div>
     
    );
};

export default Form;
