import styled from 'styled-components';
import { ApiClient } from '../../api/ApiClient';
import { Subscriber } from '../../model/database/Subscriber';
import { constructObjectFromJSON } from '../../utils/constructObjectFromJSON';

interface IFormProps {
    apiClient: ApiClient;
}

export function Form(props: IFormProps) {
    // TODO: To Config
    return (
        <FormElement
            onSubmit={async (event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const formData = new FormData(form);

                if (!formData.get('gdpr')) {
                    alert(`Potřebujeme od Vás zaškrtnout souhlas se zpracováním osobních údajů.`);
                    return;
                }

                const subscriber = constructObjectFromJSON(Subscriber, {
                    email: formData.get('email') as string,
                    fullname: formData.get('fullname') as string,
                    source: window.location.toString(),
                });

                try {
                    const result = await props.apiClient.postSubscriber(subscriber);

                    console.log('result', result);

                    form.reset();
                    alert(`Děkujeme, můžete se těšit na další email!`);
                } catch (error) {
                    alert(error.message /*TODO: Better*/);
                }
            }}
        >
            <div className="group">
                <input type="text" name="fullname" className="field" defaultValue="" />
                <label htmlFor="name">Vaše jméno:</label>
                <div className="bar"></div>
            </div>

            <div className="group">
                <input type="email" name="email" defaultValue="@" required className="field" />
                <label htmlFor="email">E-mail: *</label>
                <div className="bar"></div>
            </div>

            <div className="group checkbox gdpr">
                <input type="checkbox" name="gdpr" id="gdpr" defaultChecked={false} />
                <label htmlFor="gdpr">Souhlasím se zpracováním osobních údajů</label>
            </div>

            {/* TODO: We need here some GDPR */}
            <div className="center">
                <input value="Přihlásit se " type="submit" id="submit" name="submit" className="button" />
            </div>
        </FormElement>
    );
}

const FormElement = styled.form`
    padding: 40px 0;
    max-width: 450px;

    label {
        position: absolute;
        top: 20px;
        color: rgba(255, 255, 255, 0.5);
        font: 400 16px Montserrat;
        cursor: text;
        transition: 0.25s ease;
    }

    .gdpr label {
        top: 2px;
        padding-left: 8px;
    }

    .field {
        display: block;
        width: 100%;
        padding-top: 42px;
        border: none;
        border-radius: 0;
        color: white;
        background: transparent;
        font-size: 20px;
        transition: 0.3s ease;
    }
    .field:valid ~ label {
        top: 0;
        font: 700 16px;
        transition: 0.3s ease;
    }
    .field:focus {
        outline: none;
    }
    .field:focus ~ label {
        top: 0;
        font: 700 16px Montserrat;
        color: #01ccbf;
        transition: 0.3s ease;
        transform: translateX(0);
    }
    .field:focus ~ .bar:before {
        transform: translateX(0);
    }
    .field:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #333 inset;
        -webkit-text-fill-color: white !important;
    }

    .button {
        display: block;
        width: 100%;
        padding-top: 42px;
        border: none;
        border-radius: 0;
        color: white;
        background: transparent;
        font-size: 20px;
        transition: 0.3s ease;

        text-decoration: none;
        font: 100 18px Montserrat;
        padding: 16px 20px;
        color: white;
        cursor: pointer;
        display: inline-block;
        background-color: transparent;
        border-radius: 6px;
        /* border: 1px solid #ffffff55; */
        background-color: #ffffff11;
    }

    .button:hover {
        background-color: white;
        color: black;
    }

    .center {
        text-align: center;
        margin: 0 auto;
    }
`;
