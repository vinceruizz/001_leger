import React from 'react';

function TechStack() {
    return (
        <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-gray-800 w-11/12 max-w-4xl mx-auto mb-8'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Tech Stack</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <div>
                    <h3 className='text-xl font-semibold mb-2'>Languages</h3>
                    <ul className='list-disc pl-5'>
                        <li className='mb-1'>Python</li>
                        <li className='mb-1'>C</li>
                        <li className='mb-1'>C++</li>
                        <li className='mb-1'>Java</li>
                        <li className='mb-1'>SQL (MySQL and Oracle SQL)</li>
                        <li className='mb-1'>JavaScript</li>
                        <li className='mb-1'>HTML/CSS</li>
                        <li className='mb-1'>SystemVerilog</li>
                        <li className='mb-1'>Verilog HDL</li>
                        <li className='mb-1'>MATLAB</li>
                        <li className='mb-1'>Assembly (ARM and RISC-V)</li>
                        <li className='mb-1'>Tcl</li>
                        <li className='mb-1'>Bash</li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl font-semibold mb-2'>Frameworks & Libraries</h3>
                    <ul className='list-disc pl-5'>
                        <li className='mb-1'>NodeJS</li>
                        <li className='mb-1'>ExpressJS</li>
                        <li className='mb-1'>React</li>
                        <li className='mb-1'>Flask</li>
                        <li className='mb-1'>Tailwind CSS</li>
                        <li className='mb-1'>Socket</li>
                        <li className='mb-1'>Pandas</li>
                        <li className='mb-1'>Numpy</li>
                        <li className='mb-1'>OpenCV</li>
                        <li className='mb-1'>Matplotlib</li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl font-semibold mb-2'>Tools</h3>
                    <ul className='list-disc pl-5'>
                        <li className='mb-1'>Embedded Linux</li>
                        <li className='mb-1'>vCenter</li>
                        <li className='mb-1'>Dell DRAC</li>
                        <li className='mb-1'>Git</li>
                        <li className='mb-1'>Docker</li>
                        <li className='mb-1'>GCP</li>
                        <li className='mb-1'>VS Code</li>
                        <li className='mb-1'>CLion</li>
                        <li className='mb-1'>PyCharm</li>
                        <li className='mb-1'>IntelliJ</li>
                        <li className='mb-1'>Eclipse-Based IDEs</li>
                        <li className='mb-1'>Oracle APEX</li>
                        <li className='mb-1'>Type 1 Hypervisors (ESXi and Hyper-V)</li>
                        <li className='mb-1'>Fusion 360</li>
                        <li className='mb-1'>KiCAD</li>
                        <li className='mb-1'>LTSpice</li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-xl font-semibold mb-2'>Networking & Analysis</h3>
                    <ul className='list-disc pl-5'>
                        <li className='mb-1'>WireShark</li>
                        <li className='mb-1'>Cisco Packet Tracer</li>
                        <li className='mb-1'>Ekahau</li>
                        <li className='mb-1'>Cisco IOS</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TechStack;
