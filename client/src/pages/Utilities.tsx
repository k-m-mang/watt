import {Routes, Route} from 'react-router-dom';

// Components
import HeaderPage from '../components/layout/HeaderPage';
import NavTab from '../components/layout/NavTab';
import Barcode from '../components/utilities/Barcode';
import Map from '../components/utilities/Map';
import Calculator from '../components/utilities/Calculator';
import Staff from '../components/lists/Staff';
import WIP from '../components/layout/WIP';
import Resources from '../components/utilities/Resources';


export default function Utilities() {
    return (
        <HeaderPage
            heading="Utilities"
            nav={<>
                <NavTab to="." name="Barcode" />
                {/* <NavTab to="graphing" name="Graphing Calculator"/> */}
                <NavTab to="map" name="Map" />
                <NavTab to="calculator" name="Finals Calc." />
                <NavTab to="staff" name="Staff" />
                <NavTab to="courses" name="Courses" />
                <NavTab to="resources" name="Resources" />
            </>}
        >
            <Routes>
                <Route path="/" element={<Barcode />} />
                {/* <Route path="graphing`} element={<GraphingCalculator />}/> */}
                <Route path="/map" element={<Map />}/>
                <Route path="/calculator" element={<Calculator />}/>
                <Route path="/staff" element={<Staff />}/>
                <Route path="/courses" element={<WIP />}/> {/* WIP is temporary, will replace with courses when it's finished */}
                <Route path="/resources" element={<Resources />} />
            </Routes>
        </HeaderPage>
    );
}
