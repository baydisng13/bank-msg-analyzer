export type MessagesType = MessageType[]

export interface MessageType {
  _id: string
  thread_id: string
  address?: string
  date: string
  date_sent: string
  protocol?: string
  read: string
  status?: string
  type?: string
  reply_path_present?: string
  body?: string
  service_center?: string
  locked: string
  error_code?: string
  sub_id: string
  creator: string
  seen: string
  deletable: string
  sim_slot: string
  hidden: string
  app_id: string
  msg_id: string
  reserved: string
  pri?: string
  teleservice_id?: string
  svc_cmd?: string
  roam_pending?: string
  spam_report: string
  secret_mode: string
  safe_message: string
  favorite: string
  d_rpt_cnt?: string
  using_mode: string
  announcements_subtype?: string
  bin_info: string
  re_type: string
  __display_name?: string
  subject?: string
  msg_box?: string
  m_id?: string
  sub?: string
  sub_cs?: string
  ct_t?: string
  m_type?: string
  m_size?: string
  tr_id?: string
  ct_cls?: string
  callback_set?: string
  text_only?: string
  d_rpt_st?: string
  rr_st?: string
  __sender_address?: SenderAddress
  __recipient_addresses?: RecipientAddress[]
  __parts?: Part[]
  exp?: string
  m_cls?: string
  v?: string
  rr?: string
  d_rpt?: string
}

export interface SenderAddress {
  _id: string
  msg_id: string
  address: string
  type: string
  charset: string
  __display_name?: string
}

export interface RecipientAddress {
  _id: string
  msg_id: string
  address: string
  type: string
  charset: string
  __display_name?: string
}

export interface Part {
  _id: string
  mid: string
  seq: string
  ct: string
  name?: string
  text?: string
  sef_type: string
  chset?: string
  cid?: string
  _data?: string
  cl?: string
}
