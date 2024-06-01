import { Text } from "react-native"
import {
    CallContent,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-native-sdk';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY as string;
const userId = '682edafd-e30e-4196-a108-f2799641f4d5';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjgyZWRhZmQtZTMwZS00MTk2LWExMDgtZjI3OTk2NDFmNGQ1In0.Ns4KVakXdnCPgwg8xqqGPRgOBbPDqLiac0WoDFq-5oc';
const callId = 'default_82e09110-7c07-4779-876c-6a5ea2f1ce7f';
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function CallScreen() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <CallContent />
            </StreamCall>
        </StreamVideo>
    );
}