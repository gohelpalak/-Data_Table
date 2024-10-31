import { useEffect, useState } from "react";
import "./Ragistration.css"
import { RiArrowUpDownFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import { MdDeleteForever } from "react-icons/md";



function Ragistration() {

    let [data, setData] = useState({})
    let [list, setList] = useState([])
    let [hob, setHob] = useState([])
    let [ser, setSer] = useState("")
    let [symbol, setSymbol] = useState("")
    let [pos, setPos] = useState(-1)

    useEffect(() => {
        let get = JSON.parse(localStorage.getItem("Mydata"))
        get ? setList(get) : setList([])
    }, setList)

    // onchange==========
    function changeInput(e) {
        let { name, value } = e.target;

        let newHobby = [...hob]
        if (name == "hobby") {
            if (e.target.checked) {
                newHobby.push(value)
            }
            else {
                let index = newHobby.findIndex((v, i) => v == value)
                newHobby.splice(index, 1)
            }
            value = newHobby
            setHob(value)
        }

        console.log(hob);

        setData({ ...data, [name]: value })



    }

    console.log(data);
    // ============onsubmit==============
    function submitData(e) {
        e.preventDefault()
        if (pos != -1) {
            list.map((v, i) => {
                if (i == pos) {
                    list[i] = data
                }
            })
            localStorage.setItem("Mydata", JSON.stringify([...list]))

        }
        else {
            let newdata = [...list, data]
            setList(newdata)
            localStorage.setItem("Mydata", JSON.stringify(newdata))
        }


        setData({})
        setHob([])
        setPos(-1)

    }
    console.log(list);
    // =============delete==========
    function deleteData(i) {
        list.splice(i, 1)
        localStorage.setItem("Mydata", JSON.stringify([...list]))
        setList([...list])

    }
    // serching=======================
    function serchingdata(e) {
        e.preventDefault()
        let search = e.target.search.value;
        setSer(search)
    }
    // ===================sorting
    function sortby(type) {
        let newlist = [...list];
        if (type == "firstname") {
            if (symbol == "" || symbol == "^") {
                newlist.sort((a, b) => a.firstname.localeCompare(b.firstname))
                setSymbol("v")
            }

            else {
                newlist.sort((a, b) => b.firstname.localeCompare(a.firstname))
                setSymbol("^")
            }
        }
        else if (type == "gender") {
            if (symbol == "" || symbol == "^") {

                newlist.sort((a, b) => a.gender.localeCompare(b.gender))
                setSymbol("v")
            }

            else {
                newlist.sort((a, b) => b.gender.localeCompare(a.gender))
                setSymbol("^")
            }
        }

        else if (type == "city") {
            if (symbol == "" || symbol == "^") {

                newlist.sort((a, b) => a.city.localeCompare(b.city))
                setSymbol("v")
            }

            else {
                newlist.sort((a, b) => b.city.localeCompare(a.city))
                setSymbol("^")
            }
        }
        else if (type == "number") {
            if (symbol == "" || symbol == "^") {

                newlist.sort((a, b) => a.number - b.number)
                setSymbol("v")
            }

            else {
                newlist.sort((a, b) => b.number - a.number)
                setSymbol("^")
            }
        }
        localStorage.setItem("Mydata", JSON.stringify(newlist))

        setList(newlist)

    }

    // =============updatedata
    function updatedata(pos) {
        setPos(pos)
        let record = list.filter((v, i) => {
            if (i == pos) {
                return v
            }
        })
        setData(record[0])
        setHob(record[0]["hobby"])
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }} >
                <div className="foram-wrap">
                    <h1 className="heading">Student Ragistration</h1>

                    <br></br>
                    <form action="" method="post" onSubmit={(e) => submitData(e)}>
                        <div className="input">
                            <input type="text" name="firstname" placeholder="My First Name" className="firstname" onChange={(e) => changeInput(e)} value={data.firstname ? data.firstname : ""} />
                            <input type="text" name="lastname" placeholder="My Last Name" className="lastname" onChange={(e) => changeInput(e)} value={data.lastname ? data.lastname : ""} />
                        </div>
                        <div className="input2">
                            <input type="email" name="email" placeholder="Someone@example.com" className="firstname" onChange={(e) => changeInput(e)} value={data.email ? data.email : ""} />
                            <input type="number" name="number" placeholder="9712169979" className="lastname" onChange={(e) => changeInput(e)} value={data.number ? data.number : ""} />
                        </div>
                        <div className="input3">
                            <select name="city" className="firstname placeh" onChange={(e) => changeInput(e)} value={data.city ? data.city : ""}>
                                <option value="">My City</option>
                                <option value="Surat">Surat</option>
                                <option value="Ahemdabad">Ahemdabad</option>
                                <option value="Rajkot">Rajkot</option>
                                <option value="Junagadh">Junagadh</option>
                                <option value="Baroda">Baroda</option>
                                <option value="Bharuch">Bharuch</option>

                            </select>
                        </div>
                        <hr />
                        <div className="gender">
                            <h3 className="head">Gender:-</h3>
                            <input type="radio" name="gender" value="male" className="space" onChange={(e) => changeInput(e)} checked={data.gender == "male" ? "checked" : ""} />Male
                            <br></br>
                            <input type="radio" name="gender" value="female" className="space" onChange={(e) => changeInput(e)} checked={data.gender == "female" ? "checked" : ""} />Female

                        </div>
                        <br></br>
                        <hr />
                        <div className="gender">
                            <h3 className="head">Hobbies:-</h3>
                            <input type="checkbox" name="hobby" value="cricket" className="space" onChange={(e) => changeInput(e)} checked={hob.includes("cricket") ? "checked" : ""} />Cricket
                            <br></br>
                            <input type="checkbox" name="hobby" value="football" className="space" onChange={(e) => changeInput(e)} checked={hob.includes("football") ? "checked" : ""} />Football
                            <br></br>
                            <input type="checkbox" name="hobby" value="chess" className="space" onChange={(e) => changeInput(e)} checked={hob.includes("chess") ? "checked" : ""} />Chess
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div >
                            <input type="password" name="password" placeholder="Enter Password" className="password" onChange={(e) => changeInput(e)} value={data.password ? data.password : ""} />
                            <br></br><br></br>
                            <input type="submit" name="submit" value={pos == -1 ? "Submit" : "Edit"} className="submit" />

                        </div>
                    </form>

                </div>
            </div>

            <br></br><br></br>

            <form action="" className="form-serch" onSubmit={(e) => serchingdata(e)}>
                <input type="text" name="search" className="searchbar" placeholder="Search here..." />
                <button type="submit" className="serbtn" >Search  </button>
            </form>

            <br></br><br></br>
            <table border={0} align="center" cellSpacing={0}>
                <th className="thead"><button className="thead" onClick={() => sortby("firstname")}>Firstname <RiArrowUpDownFill className="icon-sort" /></button></th>
                <th className="thead">Lastname</th>
                <th className="thead">Email</th>
                <th className="thead"><button className="thead" onClick={() => sortby("number")}>Mobile <RiArrowUpDownFill className="icon-sort" /></button></th>
                <th className="thead"><button className="thead" onClick={() => sortby("city")}>City <RiArrowUpDownFill className="icon-sort" /></button></th>
                <th className="thead"><button className="thead" onClick={() => sortby("gender")}>Gender <RiArrowUpDownFill className="icon-sort" /></button></th>
                <th className="thead">Hobby</th>
                <th className="thead">Password</th>
                <th className="thead" style={{ width: "90px" }}>Update</th>

                <th className="thead" style={{ width: "90px" }}>Delete</th>


                {
                    list
                        .filter((v, i) => {
                            if (ser == "") {
                                return v;
                            }
                            else if (v.firstname.toLocaleLowerCase().match(ser.toLocaleLowerCase())) {
                                return v;
                            }
                            else if (v.city.toLocaleLowerCase().match(ser.toLocaleLowerCase())) {
                                return v
                            }
                            else if (v.email.toLocaleLowerCase().match(ser.toLocaleLowerCase())) {
                                return v
                            }
                        })
                        .map((v, i) => {
                            return (
                                <>
                                    <tr className="tablerow">
                                        <td className="tbody">{v.firstname}</td>
                                        <td className="tbody2">{v.lastname}</td>
                                        <td className="tbody">{v.email}</td>
                                        <td className="tbody2">{v.number}</td>
                                        <td className="tbody">{v.city}</td>
                                        <td className="tbody2">{v.gender}</td>
                                        <td className="tbody">{v.hobby}</td>
                                        <td className="tbody2">{v.password}</td>

                                        <td className="tbody" style={{ width: "80px" }}><button onClick={() => updatedata(i)}><FaEdit className="iconcolor edit" /></button></td>

                                        <td className="tbody2" style={{ width: "80px" }}><button onClick={() => deleteData(i)}><MdDeleteForever className="iconcolor" /></button></td>







                                    </tr>

                                </>
                            )
                        })
                }






            </table>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}
export default Ragistration;