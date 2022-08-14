import { useContext, useEffect, useRef, useState } from 'react';
import {Popover} from '@headlessui/react';
import {useAuth, useFirestore} from 'reactfire';
import { ColorResult, SketchPicker } from 'react-color';

// Components
import AnimatedPopover from '../layout/AnimatedPopover';

// Contexts
import UserDataContext, {SgyPeriodData} from '../../contexts/UserDataContext';

// Utilities
import {updateUserData} from '../../util/firestore';
import {darkPerColors, parsePeriodColor, periodColors} from '../schedule/Periods';
import {periodNameDefault} from '@watt/shared/util/schedule';


type PeriodCustomizationInputProps = {id: string, data: SgyPeriodData};
export default function PeriodCustomizationInput(props: PeriodCustomizationInputProps) {
    const {id, data: {n, c, l, o, s, r}} = props;
    const name = periodNameDefault(id);

    // Function to update this period's fields on firestore
    const auth = useAuth();
    const firestore = useFirestore();

    const updatePeriodData = async (newValue: string, field: string) =>
        await updateUserData(`classes.${id}.${field}`, newValue, auth, firestore);

    // const [color,setColor] = useState('#fff');
    const userData = useContext(UserDataContext);
    const [color, setColor] = useState(parsePeriodColor(id, userData));
    const changeColor = (color: ColorResult) => setColor(color.hex);

    const isUpperPeriod = ['0', '1', '2', '3'].includes(id);

    return (
        <div className="periods-custom-row-burrito flex items-center gap-6">
            <Popover className="relative h-10">
                <Popover.Button
                    className="w-10 h-10 rounded border-2 border-tertiary dark:border-tertiary-dark"
                    style={{backgroundColor: color}}
                />
                <AnimatedPopover className={`absolute z-10 touch-none ${isUpperPeriod ? 'top-[calc(100%_+_10px)]' : 'bottom-[calc(100%_+_10px)]'}`}>
                    {/* TODO: we should consider making our own custom picker for this */}
                    {/* or maybe styling a browser default input; these pickers come with their own component styles */}
                    {/* and, like reactstrap, don't give enough creative freedom to add, say, a "reset to defaults" button */}
                    <SketchPicker
                        className="period-customization-picker"
                        color={color}
                        onChange={changeColor}
                        onChangeComplete={(color: ColorResult) => updatePeriodData(color.hex, 'c')}
                        presetColors={userData.options.theme === 'light' ? periodColors : darkPerColors}
                        disableAlpha
                    />
                </AnimatedPopover>
            </Popover>

            <div className="flex-grow flex flex-wrap gap-4">
                <div className="flex-grow flex flex-col gap-2">
                    <label htmlFor={`${id} name`} className="secondary text-sm">{name}</label>
                    <input
                        type="text"
                        name={`${id} name`}
                        id={`${id} name`}
                        className="rounded px-3 py-1.5 bg-gray-50 dark:bg-content-secondary-dark placeholder:text-secondary dark:placeholder:text-secondary-dark placeholder:font-light border border-tertiary dark:border-tertiary-dark focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[0xFF7DADD9]"
                        placeholder={name}
                        defaultValue={n}
                        onBlur={e => updatePeriodData(e.target.value, 'n')}
                    />
                </div>

                <div className="flex-grow flex flex-col gap-2">
                    <label htmlFor={`${id} room`} className="secondary text-sm">{name} Room</label>
                    <input
                        type="text"
                        name={`${id} room`}
                        id={`${id} room`}
                        className="rounded px-3 py-1.5 bg-gray-50 dark:bg-content-secondary-dark placeholder:text-secondary dark:placeholder:text-secondary-dark placeholder:font-light border border-tertiary dark:border-tertiary-dark focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[0xFF7DADD9]"
                        placeholder={`${name} Room`}
                        defaultValue={r}
                        onBlur={e => updatePeriodData(e.target.value, 'r')}
                    />
                </div>
            </div>
        </div>
    );
}
