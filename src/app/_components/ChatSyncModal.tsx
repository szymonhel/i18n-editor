'use client';

import React, {useState} from 'react';
import CustomDialog from '@/components/ui/custom/CustomDialog';
import {Button} from '@/components/ui/button';
import {Check, File, PlugZap} from 'lucide-react';
import {Input} from '@/components/ui/input';

export type ChatSyncModalProps = {
    gptKey: string;
    onKeySet: (key: string) => void;
}
const ChatSyncModal = ({gptKey, onKeySet}: ChatSyncModalProps) => {
    const [keyFormValue, setKeyFormValue] = useState(gptKey)

    return (
        <CustomDialog fullScreen={false}
                      trigger={<Button variant={'secondary'} className={'text-white bg-cyan-600 hover:bg-cyan-700'}>
                          {!!gptKey ? <>
                          <Check />
                            Connected to GPT
                      </> : <><PlugZap className={'mr-2'}/>Connect to GPT</>}</Button>}
                      title={'Connect to GPT'}
                      content={
                          <>
                              <label htmlFor={'gptKey'}>API Key</label>
                              <Input id={'gptKey'} value={keyFormValue}
                                     onChange={e => setKeyFormValue(e.target.value)}/>
                          </>

                      }
                      footer={
                          <>
                              <Button variant={'secondary'} onClick={_ => onKeySet('')}>Cancel</Button>
                              <Button variant={'default'} onClick={_ => onKeySet(keyFormValue)}>Connect</Button>
                          </>
                      }
        />
    );
};

export default ChatSyncModal;
